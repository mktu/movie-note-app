import authenticator from '~/features/auth/server/auth.server';
import { updateMovieNote } from '~/features/movie-note/server/db';
import { parseUpdateNote } from '~/features/movie-note/server/validation/updateNote';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { putMovieNoteIds } from '../kv/tmdb';
import { updatePublicNoteOnly } from '~/features/public-note/server';

type ActionData = {
    error?: string
}
export async function action({ request, context }: ActionFunctionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseUpdateNote(await request.formData())
        await updateMovieNote(supabaseAdmin, data, user.id)
        await putMovieNoteIds(context.MovieNoteIds as KVNamespace, {
            tmdbId: data.tmdbId,
            imdbId: data.imdbId || null,
            lng: data.lng
        }, user.id)

        if (data.hasPublicNote) {
            await updatePublicNoteOnly(supabaseAdmin, {
                tmdbId: data.tmdbId,
                note: data.html || ''
            }, user.id)
        }

        return json<ActionData>({
        }, { status: 200 })
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