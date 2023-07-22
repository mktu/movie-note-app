import { json } from "@remix-run/cloudflare"
import { scrapeOrGetFromKv } from "~/features/imdb/server/scrape"


export const onRequestGet: PagesFunction<{
    ImdbInfo: KVNamespace
}> = async ({ params, env }) => {

    const { id } = params as { id: string }
    const result = await scrapeOrGetFromKv(id, env.ImdbInfo)
    return json({
        ...result.data,
        cache: result.cache
    })
}

