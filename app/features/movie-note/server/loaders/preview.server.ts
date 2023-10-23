import authenticator from '~/features/auth/server/auth.server';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';

import type { TmdbDetail, TmdbLng } from '~/features/tmdb';
import type { ErrorKey } from '~/features/movie-note/utils/error';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";


type ContentData = {
    tmdbDetail: TmdbDetail,
    isUpdate: boolean
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request)
    const url = new URL(request.url);
    const lng: TmdbLng = url.searchParams.get('lng') as TmdbLng || 'ja';
    const isUpdate = url.searchParams.get('update') === 'true'
    const noteId = params.noteId;
    if (!user) {
        return redirect('/login')
    }
    if (!noteId) {
        return json<LorderData>({ error: 'movie-id-not-found' })
    }
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)

    const getTmdbDetail_ = async (tmdbId: string, lng: TmdbLng, tmdb: Tmdb) => {
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(context.TmdbInfo as KVNamespace, tmdbId, lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(tmdbId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(context.TmdbInfo as KVNamespace, tmdbDetail)
        }
        return tmdbDetail
    }

    const tmdb = new Tmdb(tmdbData.apiKey, lng as TmdbLng)
    const [tmdbDetail] = await Promise.all([
        getTmdbDetail_(noteId, lng as TmdbLng, tmdb)])
    const contentData: Omit<ContentData, 'performanceData'> = {
        tmdbDetail,
        isUpdate
    }


    return json<LorderData>({
        content: {
            ...contentData,
        }
    })
}
