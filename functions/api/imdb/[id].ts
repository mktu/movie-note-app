import { json } from "@remix-run/cloudflare"
import { getImdbRateKv, putImdbRateKv } from "~/features/movie-note/features/imdb/server/kv"
import { parseRating } from "~/features/movie-note/features/imdb/server/parser"
import { ScrapeError } from "~/features/movie-note/features/imdb/server/exception"
import { parse } from 'node-html-parser'


export const onRequestGet: PagesFunction<{
    ImdbInfo: KVNamespace
}> = async ({ params, env }) => {

    const { id } = params as { id: string }
    const cache = await getImdbRateKv(env.ImdbInfo, id)
    if (cache) {
        return json({ ...cache, cache: true })
    }
    const res = await fetch(`https://www.imdb.com/title/${id}`)
    if (res?.status !== 200) {
        throw new ScrapeError(`${id} is not found`, res?.status || 404)
    }
    const body = await res.text()
    const root = parse(body)
    const text = root.querySelector('[aria-label="View User Ratings"]')?.firstChild.innerText
    if (!text) {
        throw new ScrapeError(`cannnot scrape ${id}`, 500)
    }
    const data = parseRating(text)
    if (!cache) {
        await putImdbRateKv(env.ImdbInfo, id, data)
    }
    return json({ ...data, cache: false })
}

