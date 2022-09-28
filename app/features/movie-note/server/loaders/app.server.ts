import type { LoaderArgs } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { listMovieNote } from '~/features/movie-note/server/db';
import { setTmdbData } from '~/features/movie-note/utils/tmdb';

import { json, redirect } from '@remix-run/cloudflare';
import { getSidebarSettings } from '@utils/cookie/cookie.server';
import { getSupabaseAdmin, userDb } from '@utils/server/db/index.server';

import type { MovieNoteListViewItem, User } from "@type-defs/backend/index";
import { getMovieNoteType } from "../cookie/cookie.server";

type LoaderData = {
    user: User,
    tmdbData: ReturnType<typeof setTmdbData>,
    movieNoteList: MovieNoteListViewItem[],
    sidebarSettings: ReturnType<typeof getSidebarSettings>,
    movieNoteType: ReturnType<typeof getMovieNoteType>,
}

export async function loader({ request, context, params }: LoaderArgs) {
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
    const movieNoteType = getMovieNoteType(request)
    return json<LoaderData>({
        user,
        tmdbData,
        movieNoteList,
        sidebarSettings,
        movieNoteType
    })
};