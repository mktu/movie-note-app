import authenticator from '~/features/auth/server/auth.server';
import { redirect, type LoaderArgs, json } from "@remix-run/cloudflare";
import type { TmdbLng, MovieCredits, Actor } from '~/features/tmdb';
import { setTmdbData, Tmdb } from '~/features/tmdb';
import type { ErrorKey } from '../../utils/error';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';
import { PerformanceCounter } from '@utils/performance';
import { tmdbKv } from '../kv';

type ContentData = {
    actor: Actor,
    movieCredits: MovieCredits,
    performanceData: { [k: string]: number }
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context, params }: LoaderArgs) {
    const user = await authenticator.isAuthenticated(request)

    const url = new URL(request.url);
    const lng = url.searchParams.get('lng');
    const actorId = params.actorId;
    if (!user) {
        return redirect('/login')
    }
    if (!actorId) {
        return json<LorderData>({ error: 'actor-id-not-found' })
    }
    if (!lng) {
        return json<LorderData>({ error: 'lng-not-found' })
    }

    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)
    const counter = new PerformanceCounter()
    const tmdb = new Tmdb(tmdbData.apiKey, lng === 'ja' ? 'ja' : 'en')
    const t1 = counter.create('tmdbActor')
    const t2 = counter.create('tmdbMovieCredits')

    const getTmdbActor_ = async (actorId: string, lng: TmdbLng, tmdb: Tmdb) => {
        t1.start()
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbActor(context.TmdbInfo as KVNamespace, actorId, lng)
        const tmdbActor = tmdbDetailKv || await tmdb.getActor(actorId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbActor(context.TmdbInfo as KVNamespace, tmdbActor, lng)
        }
        t1.comment(`disableKv=${disableKv},hit=${Boolean(tmdbDetailKv)}`)
        t1.stop()
        return tmdbActor
    }

    const getTmdbMovieCredits_ = async (actorId: string, lng: TmdbLng, tmdb: Tmdb) => {
        t2.start()
        const tmdbMovieCreditsKv = disableKv ? null : await tmdbKv.getTmdbMovieCredits(context.TmdbInfo as KVNamespace, actorId, lng)
        const tmdbMovieCredits = tmdbMovieCreditsKv || await tmdb.getMovieCredit(actorId)
        const hitKv = Boolean(tmdbMovieCreditsKv)
        if (!hitKv) {
            await tmdbKv.putTmdbMovieCredits(context.TmdbInfo as KVNamespace, tmdbMovieCredits, lng)
        }
        t2.comment(`disableKv=${disableKv},hit=${Boolean(tmdbMovieCreditsKv)}`)
        t2.stop()
        return tmdbMovieCredits
    }

    const [actor, movieCredits] = await Promise.all([
        getTmdbActor_(actorId, lng as TmdbLng, tmdb),
        getTmdbMovieCredits_(actorId, lng as TmdbLng, tmdb)])

    const contentData: Omit<ContentData, 'performanceData'> = {
        actor,
        movieCredits
    }

    t1.finish()
    t2.finish()

    return json<LorderData>({
        content: {
            ...contentData,
            performanceData: counter.getResults()
        }
    })
}