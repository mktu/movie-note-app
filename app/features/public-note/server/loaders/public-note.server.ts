import authenticator from '~/features/auth/server/auth.server';
import { tmdbKv } from '~/features/movie-note/server/kv';
import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';

import type { TmdbDetail, TmdbLng } from '~/features/tmdb';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { ErrorKey } from '../../utils/error';
import type { PublicNoteType } from '../db';
import { loadPublicNoteByViewId } from '../db';
import { getSupabaseAdmin } from '@utils/server/db';


type ContentData = {
    tmdbDetail: TmdbDetail,
    publicNote?: PublicNoteType,
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request)
    const url = new URL(request.url);
    const lng: TmdbLng = url.searchParams.get('lng') as TmdbLng || 'ja';
    const viewId = params.viewId;
    if (!user) {
        return redirect('/login')
    }
    if (!viewId) {
        return json<LorderData>({ error: 'public-note-id-not-found' })
    }
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)
    const dbAdmin = getSupabaseAdmin(context)
    const publicNote = await loadPublicNoteByViewId(dbAdmin, viewId)
    if (!publicNote) {
        return json<LorderData>({ error: 'public-note-not-found' })
    }

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
        getTmdbDetail_(publicNote.tmdb_id, lng as TmdbLng, tmdb)])
    const contentData: Omit<ContentData, 'performanceData'> = {
        tmdbDetail,
        publicNote
    }


    return json<LorderData>({
        content: {
            ...contentData,
        }
    })
}
