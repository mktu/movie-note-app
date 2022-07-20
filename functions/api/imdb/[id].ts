import { json } from "@remix-run/cloudflare"
import type { ImdbRate } from "~/features/movie-note/features/imdb/types"


export const onRequestGet: PagesFunction<{
    IMDB_SCRAPER_URL: string,
    ImdbInfo: KVNamespace
}> = async ({ params, env }) => {

    const url = env.IMDB_SCRAPER_URL
    const { id } = params as { id: string }
    const kv = env.ImdbInfo
    const cache = await kv.get(id);
    if (cache) {
        return json({ ...JSON.parse(cache), cache: true })
    }
    const res = await fetch(`${url}/${id}`)
    const data = await res.json<ImdbRate>()

    if (!cache) {
        await kv.put(id, JSON.stringify(data), { expirationTtl: 60 * 60 * 24 * 7 })
    }
    return json({ ...data, cache: false })
}