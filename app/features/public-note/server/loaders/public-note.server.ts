import { tmdbKv } from '~/features/movie-note/server/kv';
import { setTmdbData, Tmdb } from '~/features/tmdb';

import { json } from '@remix-run/cloudflare';
import { getSearchParamAsBoolean } from '@utils/searchparam.server';

import type { TmdbDetail, TmdbLng } from '~/features/tmdb';
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import type { ErrorKey } from '../../utils/error';
import type { PublicNoteType } from '../db';
import { loadPublicNoteByViewId } from '../db';
import { getSupabaseAdmin } from '@utils/server/db';
import { userDb } from '~/features/profile/server/db';
import type { UserType } from '~/features/profile/server/db/user.server';
import { initServerContext } from '~/features/auth/server/init.server';


type ContentData = {
    tmdbDetail: TmdbDetail,
    publicNote?: PublicNoteType,
    creator: UserType | null,
}

export type LorderData = {
    error?: ErrorKey,
    content?: ContentData,
    loginUser?: UserType | null,
}

export async function loader({ request, context, params }: LoaderFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const authUser = await authenticator.isAuthenticated(request)
    const url = new URL(request.url);
    const lng: TmdbLng = url.searchParams.get('lng') as TmdbLng || 'ja';
    const viewId = params.viewId;
    if (!viewId) {
        return json<LorderData>({ error: 'public-note-id-not-found' })
    }
    const dbAdmin = getSupabaseAdmin(context)
    const user = authUser ? await userDb.getUser(dbAdmin, authUser.id) : null
    const disableKv = getSearchParamAsBoolean(request, 'disableKv')
    const tmdbData = setTmdbData(context)
    const publicNote = await loadPublicNoteByViewId(dbAdmin, viewId)
    if (!publicNote) {
        return json<LorderData>({ error: 'public-note-not-found' })
    }
    const creator = await userDb.getUser(dbAdmin, publicNote.user_id);
    const { cloudflare: { env: { TmdbInfo } } } = context

    const getTmdbDetail_ = async (tmdbId: string, lng: TmdbLng, tmdb: Tmdb) => {
        const tmdbDetailKv = disableKv ? null : await tmdbKv.getTmdbKv(TmdbInfo, tmdbId, lng)
        const tmdbDetail = tmdbDetailKv || await tmdb.getDetail(tmdbId)
        const hitKv = Boolean(tmdbDetailKv)
        if (!hitKv) {
            await tmdbKv.putTmdbInfo(TmdbInfo, tmdbDetail)
        }
        return tmdbDetail
    }

    const tmdb = new Tmdb(tmdbData.apiKey, lng as TmdbLng)
    const [tmdbDetail] = await Promise.all([
        getTmdbDetail_(publicNote.tmdb_id, lng as TmdbLng, tmdb)])
    const contentData: Omit<ContentData, 'performanceData'> = {
        tmdbDetail,
        publicNote,
        creator
    }


    return json<LorderData>({
        content: {
            ...contentData,
        },
        loginUser: user
    })
}
