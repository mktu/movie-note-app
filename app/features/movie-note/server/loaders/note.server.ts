import { loadMovieNote } from '~/features/movie-note/server/db';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { getMovieNoteIds } from '~/features/movie-note/server/kv/tmdb';
import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { PerformanceCounter } from '@utils/performance';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';
import { getSupabaseAdmin } from '@utils/server/db';

import type { MovieNoteType } from '~/features/movie-note/server/db';
import type { Credits, TmdbDetail, TmdbLng } from '~/features/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { loadPublicNoteIfExists } from '~/features/public-note/server';
import { NoteActionResultSessionKey } from '../constants';
import { initServerContext } from '~/features/auth/server/init.server';


type ContentData = {
    movieNoteDetail: MovieNoteType,
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
    performanceData: { [k: string]: number },
    hasPublicNote: boolean,
    published: boolean
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData,
    actionResult?: number | null
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const { authenticator, sessionStorage } = initServerContext(context)
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
    const { cloudflare: { env: { MovieNoteIds, TmdbInfo } } } = context
    const ids = await getMovieNoteIds(MovieNoteIds, noteId, user.id)
    t0.comment(`id-cached=${Boolean(ids)}`)
    t0.stop()

    const t1 = counter.create('loadMovieNote')
    const t2 = counter.create('tmdbDetail')
    const t3 = counter.create('tmdbCredits')
    const t4 = counter.create('imdbInfoKv')
    const t5 = counter.create('publicNote')
    const tall = counter.start('all')

    const loadMovieNote_ = async () => {
        t1.start()
        const note = await loadMovieNote(dbAdmin, user.id, noteId)
        t1.finish()
        return note
    }

    const getTmdbDetail_ = async (tmdbId: string, lng: TmdbLng, tmdb: Tmdb) => {
        t2.start()
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(TmdbInfo, tmdbId, lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(tmdbId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(TmdbInfo, tmdbDetail)
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

    const getHasPublicNote_ = async () => {
        t5.start()
        const note = await loadPublicNoteIfExists(dbAdmin, noteId, user.id)
        t5.stop()
        if (note) {
            return {
                hasPublicNote: true,
                published: note.public
            }
        }
        else {
            return {
                hasPublicNote: false,
                published: false
            }
        }
    }

    let contentData: Omit<ContentData, 'performanceData'>;
    if (ids) {
        const lng = ids.lng === 'ja' ? 'ja' : 'en'
        const tmdb = new Tmdb(tmdbData.apiKey, lng)
        const [note, tmdbDetail, tmdbCredits, hasPublicNote] = await Promise.all([
            loadMovieNote_(),
            getTmdbDetail_(ids.tmdbId, lng, tmdb),
            getTmdbCredits_(ids.tmdbId, tmdb),
            getHasPublicNote_()])
        contentData = {
            movieNoteDetail: note,
            tmdbDetail,
            tmdbCredits,
            ...hasPublicNote
        }
    } else {
        const note = await loadMovieNote_()
        const lng = note.lng === 'ja' ? 'ja' : 'en'
        const tmdb = new Tmdb(tmdbData.apiKey, lng)
        if (!note.tmdb_id) {
            throw Error('tmdb id is undefined')
        }
        const [tmdbDetail, tmdbCredits, hasPublicNote] = await Promise.all([
            getTmdbDetail_(note.tmdb_id, lng, tmdb),
            getTmdbCredits_(note.tmdb_id, tmdb),
            getHasPublicNote_()])
        contentData = {
            movieNoteDetail: note,
            tmdbDetail,
            tmdbCredits,
            ...hasPublicNote
        }

    }
    t0.finish()
    t1.finish()
    t2.finish()
    t3.finish()
    t4.finish()
    tall.finish()

    const session = await sessionStorage.getSession(
        request.headers.get("Cookie")
    );
    const message: number | null = session.get(NoteActionResultSessionKey) || null;

    return json<LorderData>({
        content: {
            ...contentData,
            performanceData: counter.getResults()
        },
        actionResult: message
    }, {
        headers: {
            // only necessary with cookieSessionStorage
            "Set-Cookie": await sessionStorage.commitSession(session),
        },
    })
}
