import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { listMovieNote } from '~/features/movie-note/server/db';
import { setTmdbData } from '~/features/tmdb';
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSidebarSettings } from '@utils/cookie/cookie.server';
import { getSupabaseAdmin } from '@utils/server/db';

import type { MovieListType } from '~/features/movie-note/server/db';
import type { UserType } from "~/features/profile/server/db/user.server";
import type { ListTemplateType } from "~/features/note-template/server/db/template";
import { listMyTemplate } from "~/features/note-template/server/db/template";
import { initServerContext } from "~/features/auth/server/init.server";

type LoaderData = {
    user: UserType,
    tmdbData: ReturnType<typeof setTmdbData>,
    movieNoteList: MovieListType,
    templateList: ListTemplateType,
    sidebarSettings: ReturnType<typeof getSidebarSettings>
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const authUser = await authenticator.isAuthenticated(request)

    if (!authUser) {
        return redirect('/login')
    }
    const dbAdmin = getSupabaseAdmin(context)
    const user = await userDb.getUser(dbAdmin, authUser.id)
    if (!user) {
        return redirect('/register')
    }
    const tmdbData = setTmdbData(context)
    const movieNoteList = await listMovieNote(dbAdmin, authUser.id)
    const templateList = await listMyTemplate(dbAdmin, authUser.id)
    const sidebarSettings = getSidebarSettings(request)
    return json<LoaderData>({
        user,
        tmdbData,
        movieNoteList,
        templateList,
        sidebarSettings,
    })
}