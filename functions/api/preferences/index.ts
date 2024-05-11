import { json } from "@remix-run/cloudflare"
import { getSupabaseAdminFunction } from "@utils/supabaseAdmin.server";
import { initFunctionContext } from "~/features/auth/server/init.server";
import { updateUserSettings } from "~/features/movie-note/server/db";
import { parseUserSettings } from "~/features/movie-note/server/validation/parseUserSetting";

export const onRequestPut: PagesFunction<Env> = async ({ env, request }) => {
    const { authenticator } = initFunctionContext(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const kv = parseUserSettings(await request.json())
    const dbAdmin = getSupabaseAdminFunction(env)
    await updateUserSettings(dbAdmin, authUser.id, [kv])

    return json({
        path: `/api/notes/images/${1}`
    })
}