import authenticator from '~/features/auth/server/auth.server';
import { registerMovieNote } from '~/features/movie-note/server/db';
import { parseAddNote } from '~/features/movie-note/server/validation';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import { putMovieNoteIds } from '../kv/tmdb';

import type { ActionArgs } from "@remix-run/cloudflare";

type ActionData = {
    error?: string
}

export async function action({ request, context }: ActionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddNote(await request.formData())
        await registerMovieNote(supabaseAdmin, data, user.id)
        await putMovieNoteIds(context.MovieNoteIds as KVNamespace, {
            tmdbId: data.tmdbId,
            imdbId: data.imdbId || null,
            lng: data.lng
        }, user.id)
        return redirect(`/app/notes/${data.tmdbId}`)
    } catch (e) {
        if (e instanceof MovieNoteError) {
            return json<ActionData>({
                error: e.message
            }, { status: e.status })
        }
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
}