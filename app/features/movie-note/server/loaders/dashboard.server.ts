import Tmdb, { setTmdbData } from '~/features/movie-note/utils/tmdb';
import i18next from '~/i18next.server';

import { json } from '@remix-run/cloudflare';

import type { TmdbTrends } from '~/features/movie-note/utils/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderArgs } from "@remix-run/cloudflare";

type ContentData = {
    trends: TmdbTrends
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context }: LoaderArgs) {
    let lng = await i18next.getLocale(request);
    const tmdbData = setTmdbData(context)
    const tmdb = new Tmdb(tmdbData.apiKey, lng === 'ja' ? 'ja' : 'en')
    const trends = await tmdb.getTrends()
    return json({
        trends
    })
}