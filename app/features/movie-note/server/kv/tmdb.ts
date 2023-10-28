import type { Actor, MovieCredits, TmdbDetail, TmdbLng, TmdbTrends } from '~/features/tmdb';

type MovieNoteIds = {
    tmdbId: string,
    imdbId: string | null,
    lng: string
}

const makeMovieNoteKey = (userId: string, tmdbId: string) => `${userId}-${tmdbId}`

const makeDetailKey = (tmdbId: string, lng: TmdbLng) => `detail-${lng}-${tmdbId}`

const makeActorKey = (actorId: string, lng: TmdbLng) => `actor-${lng}-${actorId}`

const makeMovieCreditsKey = (actorId: string, lng: TmdbLng) => `movie-credits-${lng}-${actorId}`

const makeTrendsKey = (lng: TmdbLng) => `trends-${lng}`

const getOrDeleteIfError = async <Expected>(kv: KVNamespace, key: string) => {
    try {
        const ret = await kv.get<Expected>(key, 'json')
        return ret || null
    } catch (error) {
        console.error(error)
        await kv.delete(key)
        return null
    }
}

const putTmdbInfo = async (kv: KVNamespace, tmdbInfo: TmdbDetail) => {
    await kv.put(makeDetailKey(tmdbInfo.id, tmdbInfo.lng), JSON.stringify(tmdbInfo), { expirationTtl: 60 * 60 * 24 * 14 /** two weeks */ })
}

const getTmdbKv = async (kv: KVNamespace, tmdbId: string, lng: TmdbLng) => {
    return await getOrDeleteIfError<TmdbDetail>(kv, makeDetailKey(tmdbId, lng))
}

const getTmdbTrends = async (kv: KVNamespace, lng: TmdbLng) => {
    return getOrDeleteIfError<TmdbTrends>(kv, makeTrendsKey(lng))
}

const putTmdnTrends = async (kv: KVNamespace, lng: TmdbLng, trends: TmdbTrends) => {
    kv.put(makeTrendsKey(lng), JSON.stringify(trends), { expirationTtl: 60 * 60 * 24 /** 1 day */ })
}

const getMovieNoteIds = async (kv: KVNamespace, tmdbId: string, userId: string) => {
    const ret = await kv.get(makeMovieNoteKey(userId, tmdbId), {
        type: 'json',
        cacheTtl: 60 * 60 * 24 * 14
    }) as MovieNoteIds
    return ret || null
}

const getTmdbActor = async (kv: KVNamespace, actorId: string, lng: TmdbLng) => {
    return await getOrDeleteIfError<Actor>(kv, makeActorKey(actorId, lng))
}

const putTmdbActor = async (kv: KVNamespace, actor: Actor, lng: TmdbLng) => {
    await kv.put(makeDetailKey(actor.id, lng), JSON.stringify(actor), { expirationTtl: 60 * 60 * 24 * 14 /** two weeks */ })
}

const getTmdbMovieCredits = async (kv: KVNamespace, actorId: string, lng: TmdbLng) => {
    return await getOrDeleteIfError<MovieCredits>(kv, makeMovieCreditsKey(actorId, lng))
}

const putTmdbMovieCredits = async (kv: KVNamespace, movieCredits: MovieCredits, lng: TmdbLng) => {
    await kv.put(makeMovieCreditsKey(movieCredits.id, lng), JSON.stringify(movieCredits), { expirationTtl: 60 * 60 * 24 * 14 /** two weeks */ })
}

const putMovieNoteIds = async (kv: KVNamespace, ids: MovieNoteIds, userId: string) => {
    await kv.put(makeMovieNoteKey(userId, ids.tmdbId), JSON.stringify(ids))
}

export {
    putTmdbInfo,
    getTmdbKv,
    getMovieNoteIds,
    putMovieNoteIds,
    putTmdnTrends,
    getTmdbTrends,
    getTmdbActor,
    putTmdbActor,
    getTmdbMovieCredits,
    putTmdbMovieCredits
}