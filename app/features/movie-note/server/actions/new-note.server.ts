import { registerMovieNote } from '~/features/movie-note/server/db';
import { parseAddNote } from '~/features/movie-note/server/validation';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import { putMovieNoteIds } from '../kv/tmdb';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { initServerContext } from '~/features/auth/server/init.server';

type ActionData = {
    error?: string
}

export async function action({ request, context }: ActionFunctionArgs) {
    const { authenticator } = initServerContext(context)
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddNote(await request.formData())
        await registerMovieNote(supabaseAdmin, data, user.id)
        const { cloudflare: { env: { MovieNoteIds } } } = context
        await putMovieNoteIds(MovieNoteIds, {
            tmdbId: data.tmdbId,
            imdbId: data.imdbId || null,
            lng: data.lng
        }, user.id)
        return redirect('/app')
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