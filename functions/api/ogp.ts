import { json } from "@remix-run/cloudflare"
import { ServerError } from "@utils/server/error"
import mql from '@microlink/mql'

const doScrape = async (url: string) => {
    try {
        const ret = await mql(url, undefined, { credentials: undefined })
        return {
            title: ret.data.title,
            author: ret.data.author,
            description: ret.data.description,
            image: ret.data.image?.url,
            date: ret.data.date,
            logo: ret.data.logo?.url,
            url: ret.data.url
        }
    } catch (e) {
        console.error(e)
        throw new ServerError('scraping-error')
    }
}

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export type OgpType = UnPromisify<ReturnType<typeof doScrape>>

const getOgp = async (url: string, kv: KVNamespace) => {
    try {
        const cache = await kv.get(url, 'json') as OgpType | null
        if (cache) {
            return {
                ...cache,
                cache: true
            }
        }
    } catch (error) {
        console.error(error)
    }
    const result = await doScrape(url)
    kv.put(url, JSON.stringify(result), { expirationTtl: 60 * 60 * 24 * 7 /** one weeks */ })
    return result
}

export const onRequestGet: PagesFunction<{
    OgpInfo: KVNamespace
}> = async ({ env, request }) => {
    const url = new URL(request.url);
    if (!url) {
        return new Response(`url is undefined`, {
            status: 400
        })
    }
    try {
        const p = url.searchParams.get('url')
        const result = p ? await getOgp(p, env.OgpInfo) : ''
        return json({
            ...result
        })
    } catch (e) {
        if (e instanceof ServerError) {
            return new Response(e.message, {
                status: e.code
            })
        }
        return new Response('server-error', {
            status: 500
        })
    }
}