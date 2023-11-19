import { json } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server"
import { initSessionStorage } from "~/features/auth/server/session"
import { ImdbPlaceholder, TrailerPlaceholder } from "~/features/note-template/utils/predefinedPlaceholder"
import { listTemplate } from "~/features/note-template/server/db/template"
import { getSupabaseAdmin } from "~/features/profile/server/db"
import { Tmdb } from "~/features/tmdb"

export const onRequestGet: PagesFunction<{
    COOKIE_SECRETS: string,
    APP_SUPABASE_URL: string,
    APP_SUPABASE_SECRET_KEY: string,
    TMDB_API_KEY: string
}> = async ({ env, request, params }) => {
    const { id } = params as { id: string }
    const tmdb = new Tmdb(env.TMDB_API_KEY, 'ja')
    const videos = await tmdb.getVideos(id)
    initSessionStorage(env)
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return new Response(`user is unauthorized`, {
            status: 401
        })
    }
    const dbAdmin = getSupabaseAdmin(env)
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