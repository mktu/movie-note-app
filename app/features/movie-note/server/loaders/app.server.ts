import type { LoaderFunction } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { listMovieNote } from '~/features/movie-note/server/db';
import { setTmdbData } from '~/features/movie-note/utils/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { getSidebarSettings } from '@utils/cookie/cookie.server';
import { getSupabaseAdmin, userDb } from '@utils/server/db/index.server';

import type { MovieNoteListViewItem, User } from "@type-defs/backend/index";

type LoaderData = {
    user: User,
    tmdbData: ReturnType<typeof setTmdbData>,
    movieNoteList: MovieNoteListViewItem[],
    sidebarSettings: ReturnType<typeof getSidebarSettings>,
}

export const loader: LoaderFunction = async ({ request, context }) => {
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
    const sidebarSettings = getSidebarSettings(request)
    return json<LoaderData>({
        user,
        tmdbData,
        movieNoteList,
        sidebarSettings
    })
};