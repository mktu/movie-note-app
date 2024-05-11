import { setTmdbData, Tmdb } from '~/features/tmdb';
import i18next from '~/i18next.server';

import { json } from '@remix-run/cloudflare';

import type { TmdbTrends } from '~/features/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { tmdbKv } from '~/features/movie-note/server/kv';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';
import { PerformanceCounter } from '@utils/performance';

type ContentData = {
    trends: TmdbTrends,
    performanceData: { [k: string]: number }
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    let lng = await i18next.getLocale(request);
    const tmdbData = setTmdbData(context)
    const tmdb = new Tmdb(tmdbData.apiKey, lng === 'ja' ? 'ja' : 'en')
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    let trends: TmdbTrends;
    const counter = new PerformanceCounter()
    const getTrendsFromTmdb = async () => {
        const t1 = counter.start('tmdb.getTrends')
        try {
            return await tmdb.getTrends()
        } finally {
            t1.finish()
        }
    }
    if (!disableKv) {
        const t0 = counter.start('tmdbKv.getTmdbTrends')
        const { cloudflare: { env: { TmdbInfo } } } = context
        const trendsFromKv = await tmdbKv.getTmdbTrends(TmdbInfo, tmdb.lng)
        t0.finish()
        if (!trendsFromKv) {
            trends = await getTrendsFromTmdb()
            tmdbKv.putTmdnTrends(TmdbInfo, tmdb.lng, trends)
        } else {
            trends = trendsFromKv
        }
    } else {
        trends = await getTrendsFromTmdb()
    }


    return json({
        trends,
        performanceData: counter.getResults()
    })
}