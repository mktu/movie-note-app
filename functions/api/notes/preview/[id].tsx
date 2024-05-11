import { json } from "@remix-run/cloudflare"
import { getSupabaseAdminFunction } from "@utils/supabaseAdmin.server"
import { initFunctionContext } from "~/features/auth/server/init.server"
import { loadMovieNote } from "~/features/movie-note/server/db"
import { convertHtmlFromNode } from "~/features/movie-note/server/rte"

// TODO: not working because "generateHtmlFromNodes" cannot work without virtual DOM like JSDOM
// but JSDOM can not work in Cloudflare worker
export const onRequestGet: PagesFunction<Env> = async ({ env, request, params }) => {
    const { id } = params as { id: string }
    const { authenticator } = initFunctionContext(env)
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
    const dbAdmin = getSupabaseAdminFunction(env)
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