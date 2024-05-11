import { json } from "@remix-run/cloudflare"
import { getSupabaseAdminFunction } from "@utils/supabaseAdmin.server"
import { initFunctionContext } from "~/features/auth/server/init.server"
import { listMovieNote } from "~/features/movie-note/server/db"
import type { FilterType } from "~/features/movie-note/server/types"

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
    const { authenticator } = initFunctionContext(env)

    const url = new URL(request.url);
    if (!url) {
        return new Response(`url is undefined`, {
            status: 400
        })
    }
    const filterType = url.searchParams.get('filterType') as FilterType
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const dbAdmin = getSupabaseAdminFunction(env)
    const movieNoteList = await listMovieNote(dbAdmin, authUser.id, filterType)

    return json({
        movieNoteList
    })
}