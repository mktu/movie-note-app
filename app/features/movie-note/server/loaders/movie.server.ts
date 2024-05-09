import { getImdbRateKv } from '~/features/imdb/server/kv';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { PerformanceCounter } from '@utils/performance';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';

import type { Credits, TmdbDetail, TmdbLng } from '~/features/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { ImdbRate } from '~/features/imdb/types';
import type { Video } from '~/features/tmdb/utils';
import type { MovieNoteType } from '../db';
import { loadMovieNoteIfExists } from '../db';
import { getSupabaseAdmin } from '@utils/supabaseAdmin.server';
import { initServerContext } from '~/features/auth/server/init.server';

type ContentData = {
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
    trailers: Video[],
    imdbRate: ImdbRate | null,
    performanceData: { [k: string]: number },
    note: MovieNoteType | null
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const user = await authenticator.isAuthenticated(request)
    const url = new URL(request.url);
    const lng = url.searchParams.get('lng');
    const movieId = params.movieId;
    if (!user) {
        return redirect('/login')
    }
    if (!movieId) {
        return json<LorderData>({ error: 'movie-id-not-found' })
    }
    // But this case never happens. Because if there is no noteId, 
    // it is treated as a different route and will result in a 404 error.
    if (!lng) {
        return json<LorderData>({ error: 'lng-not-found' })
    }
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)
    const dbAdmin = getSupabaseAdmin(context)
    const counter = new PerformanceCounter()
    const t1 = counter.create('tmdbDetail')
    const t2 = counter.create('tmdbCredits')
    const t3 = counter.create('imdbInfoKv')
    const t4 = counter.create('tmdbTrailers')
    const t5 = counter.create('movieNote')

    const tall = counter.start('all')

    const { cloudflare: { env: { TmdbInfo, ImdbInfo } } } = context

    const getTmdbDetail_ = async (tmdbId: string, lng: TmdbLng, tmdb: Tmdb) => {
        t1.start()
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(TmdbInfo, tmdbId, lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(tmdbId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(TmdbInfo, tmdbDetail)
        }
        t1.comment(`disableKv=${disableKv},hit=${Boolean(tmdbDetailKv)}`)
        t1.stop()
        return tmdbDetail
    }

    const getTmdbCredits_ = async (tmdbId: string, tmdb: Tmdb) => {
        t2.start()
        const credits = await tmdb.getCredits(tmdbId)
        t2.stop()
        return credits
    }

    const getImdbRate_ = async (imdbId: string | null) => {
        t3.start()
        const imdbRate = imdbId ? await getImdbRateKv(ImdbInfo, imdbId) : null
        t3.stop()
        return imdbRate
    }

    const getTrailers_ = async (tmdbId: string, tmdb: Tmdb) => {
        t4.start()
        const trailers = await tmdb.getYoutubeTrailers(tmdbId)
        t4.stop()
        return trailers
    }

    const tmdb = new Tmdb(tmdbData.apiKey, lng as TmdbLng)
    const [tmdbDetail, tmdbCredits, imdbRate, trailers] = await Promise.all([
        getTmdbDetail_(movieId, lng as TmdbLng, tmdb),
        getTmdbCredits_(movieId, tmdb),
        getImdbRate_(movieId),
        getTrailers_(movieId, tmdb)])

    const getMovieNote = async () => {
        t5.start()
        const note = await loadMovieNoteIfExists(dbAdmin, user.id, tmdbDetail.id)
        t5.stop()
        return note
    }
    const note = await getMovieNote()

    const contentData: Omit<ContentData, 'performanceData'> = {
        tmdbDetail,
        tmdbCredits,
        imdbRate,
        trailers,
        note
    }


    t1.finish()
    t2.finish()
    t3.finish()
    t4.finish()
    t5.finish()
    tall.finish()

    return json<LorderData>({
        content: {
            ...contentData,
            performanceData: counter.getResults()
        }
    })
}
