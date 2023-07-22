import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json } from '@remix-run/cloudflare';

import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderArgs } from "@remix-run/cloudflare";

type ContentData = {
    tmdbDetail: TmdbDetail,
    tmdbCredits: Credits,
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context }: LoaderArgs) {
    const url = new URL(request.url);
    const tmdbId = url.searchParams.get('tmdbId');
    const lng = url.searchParams.get('lng');
    if (!tmdbId || !lng) {
        return json<LorderData>({})
    }
    const tmdbData = setTmdbData(context)
    const tmdb = new Tmdb(tmdbData.apiKey, lng === 'ja' ? 'ja' : 'en')
    const detail = await tmdb.getDetail(tmdbId)
    const credits = await tmdb.getCredits(tmdbId)
    return json<LorderData>({
        content: {
            tmdbCredits: credits,
            tmdbDetail: detail
        }
    })
}