import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server";
import { initSessionStorage } from "~/features/auth/server/session";
import { updateUserSettings } from "~/features/movie-note/server/db";
import { parseUserSettings } from "~/features/movie-note/server/validation/parseUserSetting";
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
    const kv = parseUserSettings(await request.json())
    const dbAdmin = getSupabaseAdmin(env)
    await updateUserSettings(dbAdmin, authUser.id, [kv])

    return json({
        path: `/api/notes/images/${1}`
    })
}