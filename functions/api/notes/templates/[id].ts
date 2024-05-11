import { json } from "@remix-run/cloudflare"
import { ImdbPlaceholder, TrailerPlaceholder } from "~/features/note-template/utils/predefinedPlaceholder"
import { listTemplate } from "~/features/note-template/server/db/template"
import { Tmdb } from "~/features/tmdb"
import { initFunctionContext } from "~/features/auth/server/init.server"
import { getSupabaseAdminFunction } from "@utils/supabaseAdmin.server"

export const onRequestGet: PagesFunction<Env> = async ({ env, request, params }) => {
    const { authenticator } = initFunctionContext(env)
    const { id } = params as { id: string }
    const tmdb = new Tmdb(env.TMDB_API_KEY, 'ja')
    const videos = await tmdb.getVideos(id)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const dbAdmin = getSupabaseAdminFunction(env)
    const detail = await tmdb.getDetail(id)
    const templates = ((await listTemplate(dbAdmin, authUser?.id)).map(t =>
        videos.results.length > 0 ? ({ ...t, html: t.html?.replace(TrailerPlaceholder, videos.results[0].key) }) : t
    )).map(t =>
    ({
        ...t, html: t.html?.replace(ImdbPlaceholder, `https://www.imdb.com/title/${detail.imdb_id}`)
    })
    )
    return json(templates)
}