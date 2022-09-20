import type { TmdbDetail, TmdbLng } from "../../utils/tmdb";

const makeDetailKey = (tmdbId: string, lng: TmdbLng) => `detail-${lng}-${tmdbId}`

const putTmdbInfo = async (kv: KVNamespace, tmdbInfo: TmdbDetail) => {
    await kv.put(makeDetailKey(tmdbInfo.id, tmdbInfo.lng), JSON.stringify(tmdbInfo), { expirationTtl: 60 * 60 * 24 * 14 /** two weeks */ })
}

const getTmdbKv = async (kv: KVNamespace, tmdbId: string, lng: TmdbLng) => {
    const ret = await kv.get(makeDetailKey(tmdbId, lng), 'json') as TmdbDetail
    return ret || null
}

export {
    putTmdbInfo,
    getTmdbKv
}