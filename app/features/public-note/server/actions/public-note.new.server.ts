import authenticator from '~/features/auth/server/auth.server';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddPublicNote } from '../validation/addPublicNote';
import { upsertPublicNote } from '../db';
import type { TmdbLng } from '~/features/tmdb';

type ActionData = {
    error?: string,
    success?: boolean
}
export async function action({ request, context, params }: ActionFunctionArgs) {

    const user = await authenticator.isAuthenticated(request)
    const noteId = params.noteId;
    const url = new URL(request.url);
    const lng: TmdbLng = url.searchParams.get('lng') as TmdbLng || 'ja';

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddPublicNote(await request.formData())
        await upsertPublicNote(supabaseAdmin, data, user.id)
        return redirect(`/app/note-public/${noteId}/update?lng=${lng}&created=true`)
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