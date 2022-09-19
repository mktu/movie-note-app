import type { ImdbRate } from "../types";


const putImdbRateKv = async (kv: KVNamespace, imdbId: string, imdbRate: ImdbRate) => {
    await kv.put(imdbId, JSON.stringify(imdbRate), { expirationTtl: 60 * 60 * 24 * 7 /** one weeks */ })
}

const getImdbRateKv = async (kv: KVNamespace, imdbId: string) => {
    const ret = await kv.get(imdbId, 'json') as ImdbRate
    return ret || null
}

export {
    putImdbRateKv,
    getImdbRateKv
}