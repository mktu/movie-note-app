import authenticator from '~/features/auth/server/auth.server';
import { getImdbRateKv } from '~/features/movie-note/features/imdb/server/kv';
import { loadMovieNote } from '~/features/movie-note/server/db';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { getMovieNoteIds } from '~/features/movie-note/server/kv/tmdb';
import Tmdb, { setTmdbData } from '~/features/movie-note/utils/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { PerformanceCounter } from '@utils/performance';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';
import { getSupabaseAdmin } from '@utils/server/db/index.server';

import type { Credits, TmdbDetail, TmdbLng } from '~/features/movie-note/utils/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderArgs } from "@remix-run/cloudflare";
import type { MovieNoteDetail } from '@type-defs/backend';
import type { ImdbRate } from '~/features/movie-note/features/imdb/types';

type ContentData = {
    movieNoteDetail: MovieNoteDetail,
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
    imdbRate: ImdbRate | null,
    performanceData: { [k: string]: number }
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context, params }: LoaderArgs) {
    const user = await authenticator.isAuthenticated(request)
    const noteId = params.noteId;
    if (!user) {
        return redirect('/login')
    }
    // But this case never happens. Because if there is no noteId, 
    // it is treated as a different route and will result in a 404 error.
    if (!noteId) {
        return json<LorderData>({ error: 'movie-note-not-found' })
    }
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)
    const dbAdmin = getSupabaseAdmin(context)
    const counter = new PerformanceCounter()
    const t0 = counter.start('loadMovieNoteIds')
    const ids = await getMovieNoteIds(context.MovieNoteIds as KVNamespace, noteId, user.id)
    t0.comment(`id-cached=${Boolean(ids)}`)
    t0.stop()

    const t1 = counter.create('loadMovieNote')
    const t2 = counter.create('tmdbDetail')
    const t3 = counter.create('tmdbCredits')
    const t4 = counter.create('imdbInfoKv')
    const tall = counter.start('all')

    const loadMovieNote_ = async () => {
        t1.start()
        const note = await loadMovieNote(dbAdmin, user.id, noteId)
        t1.finish()
        return note
    }

    const getTmdbDetail_ = async (tmdbId: string, lng: TmdbLng, tmdb: Tmdb) => {
        t2.start()
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(context.TmdbInfo as KVNamespace, tmdbId, lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(tmdbId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(context.TmdbInfo as KVNamespace, tmdbDetail)
        }
        t2.comment(`disableKv=${disableKv},hit=${Boolean(tmdbDetailKv)}`)
        t2.stop()
        return tmdbDetail
    }

    const getTmdbCredits_ = async (tmdbId: string, tmdb: Tmdb) => {
        t3.start()
        const credits = await tmdb.getCredits(tmdbId)
        t3.stop()
        return credits
    }

    const getImdbRate_ = async (imdbId: string | null) => {
        t4.start()
        const imdbRate = imdbId ? await getImdbRateKv(context.ImdbInfo as KVNamespace, imdbId) : null
        t4.stop()
        return imdbRate
    }

    let contentData: Omit<ContentData, 'performanceData'>;
    if (ids) {
        const lng = ids.lng === 'ja' ? 'ja' : 'en'
        const tmdb = new Tmdb(tmdbData.apiKey, lng)
        const [note, tmdbDetail, tmdbCredits, imdbRate] = await Promise.all([
            loadMovieNote_(),
            getTmdbDetail_(ids.tmdbId, lng, tmdb),
            getTmdbCredits_(ids.tmdbId, tmdb),
            getImdbRate_(ids.imdbId)])
        contentData = {
            movieNoteDetail: note,
            tmdbDetail,
            tmdbCredits,
            imdbRate,
        }
    } else {
        const note = await loadMovieNote_()
        const lng = note.lng === 'ja' ? 'ja' : 'en'
        const tmdb = new Tmdb(tmdbData.apiKey, lng)
        const [tmdbDetail, tmdbCredits, imdbRate] = await Promise.all([
            getTmdbDetail_(note.tmdb_id, lng, tmdb),
            getTmdbCredits_(note.tmdb_id, tmdb),
            getImdbRate_(note.imdb_id)])
        contentData = {
            movieNoteDetail: note,
            tmdbDetail,
            tmdbCredits,
            imdbRate,
        }

    }
    t0.finish()
    t1.finish()
    t2.finish()
    t3.finish()
    t4.finish()
    tall.finish()

    return json<LorderData>({
        content: {
            ...contentData,
            performanceData: counter.getResults()
        }
    })
}