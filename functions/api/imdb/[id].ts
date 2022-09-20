import { json } from "@remix-run/cloudflare"
import { getImdbRateKv, putImdbRateKv } from "~/features/movie-note/features/imdb/server/kv"
import type { ImdbRate } from "~/features/movie-note/features/imdb/types"


export const onRequestGet: PagesFunction<{
    IMDB_SCRAPER_URL: string,
    ImdbInfo: KVNamespace
}> = async ({ params, env }) => {

    const url = env.IMDB_SCRAPER_URL
    const { id } = params as { id: string }
    const cache = await getImdbRateKv(env.ImdbInfo, id)
    if (cache) {
        return json({ ...cache, cache: true })
    }
    const res = await fetch(`${url}/${id}`)
    const data = await res.json<ImdbRate>()

    if (!cache) {
        await putImdbRateKv(env.ImdbInfo, id, data)
    }
    return json({ ...data, cache: false })
}