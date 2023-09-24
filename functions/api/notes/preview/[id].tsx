import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server"
import { initSessionStorage } from "~/features/auth/server/session"
import { loadMovieNote } from "~/features/movie-note/server/db"
import { convertHtmlFromNode } from "~/features/movie-note/server/rte"
import { getSupabaseAdmin } from "~/features/profile/server/db"

// TODO: not working because "generateHtmlFromNodes" cannot work without virtual DOM like JSDOM
// but JSDOM can not work in Cloudflare worker
export const onRequestGet: PagesFunction<{
    COOKIE_SECRETS: string,
    APP_SUPABASE_URL: string,
    APP_SUPABASE_SECRET_KEY: string
}> = async ({ env, request, params }) => {
    const { id } = params as { id: string }
    initSessionStorage(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    if (!id) {
        return new Response(`id must be specified`, {
            status: 400
        })
    }
    const dbAdmin = getSupabaseAdmin(env)
    const { memo } = await loadMovieNote(dbAdmin, authUser.id, id)
    if (!memo) {
        return json({
            html: ''
        })
    }

    return json({
        html: await convertHtmlFromNode(memo)
    })
}