import { parse } from 'node-html-parser'
import { ScrapeError } from "./exception"
import { getImdbRateKv, putImdbRateKv } from "./kv"
import { parseRating } from './parser'

export const scrape = async (id: string) => {
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
    return data
}

export const scrapeOrGetFromKv = async (id: string, kv: KVNamespace) => {
    const cache = await getImdbRateKv(kv, id)
    if (cache) {
        return { data: cache, cache: true }
    }
    const data = await scrape(id)
    if (!cache) {
        await putImdbRateKv(kv, id, data)
    }
    return { data: data, cache: false }
}