import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server"
import { initSessionStorage } from "~/features/auth/server/session"
import { listTemplate } from "~/features/movie-note/server/db/template"
import { getSupabaseAdmin } from "~/features/profile/server/db"

export const onRequestGet: PagesFunction<{
    COOKIE_SECRETS: string,
    APP_SUPABASE_URL: string,
    APP_SUPABASE_SECRET_KEY: string
}> = async ({ env, request }) => {
    initSessionStorage(env)
    const authUser = await authenticator.isAuthenticated(request)
    const dbAdmin = getSupabaseAdmin(env)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const templates = await listTemplate(dbAdmin, authUser?.id)
    return json(templates)
}