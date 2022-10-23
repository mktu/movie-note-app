import type { LoaderArgs } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { listMovieNote } from '~/features/movie-note/server/db';
import { setTmdbData } from '~/features/movie-note/utils/tmdb';
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSidebarSettings } from '@utils/cookie/cookie.server';
import { getSupabaseAdmin } from '@utils/server/db';

import { getMovieNoteType } from '../cookie/cookie.server';

import type { MovieListType } from '~/features/movie-note/server/db';
import type { UserType } from "~/features/profile/server/db/user.server";

type LoaderData = {
    user: UserType,
    tmdbData: ReturnType<typeof setTmdbData>,
    movieNoteList: MovieListType,
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