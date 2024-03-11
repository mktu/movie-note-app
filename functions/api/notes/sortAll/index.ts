import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server";
import { initSessionStorage } from "~/features/auth/server/session";
import { sortMovieNoteList } from "~/features/movie-note/server/db";
import { parseSortAll } from "~/features/movie-note/server/validation/parseSortAll";
import type { SortType } from "~/features/movie-note/type-defs";
import { getSupabaseAdmin } from "~/features/profile/server/db"

export const onRequestPut: PagesFunction<{
    COOKIE_SECRETS: string,
    APP_SUPABASE_URL: string,
    APP_SUPABASE_SECRET_KEY: string
}> = async ({ env, request }) => {
    initSessionStorage(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const { sortType } = parseSortAll(await request.json())
    const dbAdmin = getSupabaseAdmin(env)
    await sortMovieNoteList(dbAdmin, authUser.id, sortType as SortType)

    return json({
        success: true
    })
}