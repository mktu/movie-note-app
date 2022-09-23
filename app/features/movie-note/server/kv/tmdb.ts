import type { TmdbDetail, TmdbLng } from "../../utils/tmdb";

type MovieNoteIds = {
    tmdbId: string,
    imdbId: string | null,
    lng: string
}

const makeMovieNoteKey = (userId: string, tmdbId: string) => `${userId}-${tmdbId}`

const makeDetailKey = (tmdbId: string, lng: TmdbLng) => `detail-${lng}-${tmdbId}`

const putTmdbInfo = async (kv: KVNamespace, tmdbInfo: TmdbDetail) => {
    await kv.put(makeDetailKey(tmdbInfo.id, tmdbInfo.lng), JSON.stringify(tmdbInfo), { expirationTtl: 60 * 60 * 24 * 14 /** two weeks */ })
}

const getTmdbKv = async (kv: KVNamespace, tmdbId: string, lng: TmdbLng) => {
    const ret = await kv.get(makeDetailKey(tmdbId, lng), 'json') as TmdbDetail
    return ret || null
}

const getMovieNoteIds = async (kv: KVNamespace, tmdbId: string, userId: string) => {
    const ret = await kv.get(makeMovieNoteKey(userId, tmdbId), {
        type: 'json',
        cacheTtl: 60 * 60 * 24 * 14
    }) as MovieNoteIds
    return ret || null
}

const putMovieNoteIds = async (kv: KVNamespace, ids: MovieNoteIds, userId: string) => {
    await kv.put(makeMovieNoteKey(userId, ids.tmdbId), JSON.stringify(ids))
}

export {
    putTmdbInfo,
    getTmdbKv,
    getMovieNoteIds,
    putMovieNoteIds
}