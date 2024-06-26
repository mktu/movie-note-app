import { updateMovieNote } from '~/features/movie-note/server/db';
import { parseUpdateNote } from '~/features/movie-note/server/validation/updateNote';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { putMovieNoteIds } from '../kv/tmdb';
import { updatePublicNoteOnly } from '~/features/public-note/server';
import { NoteActionResultSessionKey } from '../constants';
import { initServerContext } from '~/features/auth/server/init.server';

type ActionData = {
    error?: string
}
export async function action({ request, context }: ActionFunctionArgs) {
    const { authenticator, sessionStorage } = initServerContext(context)
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseUpdateNote(await request.formData())
        await updateMovieNote(supabaseAdmin, data, user.id)
        const { cloudflare: { env: { MovieNoteIds } } } = context
        await putMovieNoteIds(MovieNoteIds, {
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

        const session = await sessionStorage.getSession(
            request.headers.get("Cookie")
        );

        session.flash(
            NoteActionResultSessionKey,
            Date.now()
        );

        return json<ActionData>({
        }, {
            status: 200, headers: {
                "Set-Cookie": await sessionStorage.commitSession(session)
            }
        })
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