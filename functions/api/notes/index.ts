import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server"
import { initSessionStorage } from "~/features/auth/server/session"
import { listMovieNote } from "~/features/movie-note/server/db"
import type { FilterType, SortType } from "~/features/movie-note/server/types"
import { getSupabaseAdmin } from "~/features/profile/server/db"

export const onRequestGet: PagesFunction<{
    COOKIE_SECRETS: string,
    APP_SUPABASE_URL: string,
    APP_SUPABASE_SECRET_KEY: string
}> = async ({ env, request }) => {
    const url = new URL(request.url);
    if (!url) {
        return new Response(`url is undefined`, {
            status: 400
        })
    }
    const sortType = url.searchParams.get('sortType') as SortType
    const filterType = url.searchParams.get('filterType') as FilterType
    initSessionStorage(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const dbAdmin = getSupabaseAdmin(env)
    const movieNoteList = await listMovieNote(dbAdmin, authUser.id, { sortType, filterType })

    return json({
        movieNoteList
    })
}