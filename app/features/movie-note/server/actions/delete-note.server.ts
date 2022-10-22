import authenticator from '~/features/auth/server/auth.server';
import { deleteNote } from '~/features/movie-note/server/db';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import { parseDeleteNote } from '../validation/delete-note';

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
        const data = parseDeleteNote(await request.formData())
        await deleteNote(supabaseAdmin, data.noteId, user.id)
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
};