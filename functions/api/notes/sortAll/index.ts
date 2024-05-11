import { json } from "@remix-run/cloudflare"
import { getSupabaseAdminFunction } from "@utils/supabaseAdmin.server";
import { initFunctionContext } from "~/features/auth/server/init.server";
import { sortMovieNoteList } from "~/features/movie-note/server/db";
import { parseSortAll } from "~/features/movie-note/server/validation/parseSortAll";
import type { SortType } from "~/features/movie-note/type-defs";

export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
    const { authenticator } = initFunctionContext(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const { sortType } = parseSortAll(await request.json())
    const dbAdmin = getSupabaseAdminFunction(env)
    await sortMovieNoteList(dbAdmin, authUser.id, sortType as SortType)

    return json({
        success: true
    })
}