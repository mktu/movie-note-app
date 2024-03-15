import authenticator from '~/features/auth/server/auth.server';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddPublicNote } from '../validation/addPublicNote';
import { upsertPublicNote } from '../db';
import { commitSession, getSession } from '~/features/auth/server/session';
import { PreviewNoteActionResultSessionKey } from '../constants';

type ActionData = {
    error?: string,
    success?: boolean
}
export async function action({ request, context }: ActionFunctionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)

    try {
        const data = parseAddPublicNote(await request.formData())
        await upsertPublicNote(supabaseAdmin, data, user.id)
        const session = await getSession(
            request.headers.get("Cookie")
        );

        session.flash(
            PreviewNoteActionResultSessionKey,
            Date.now()
        );
        return json<ActionData>({
            success: true
        }, {
            status: 200, headers: {
                "Set-Cookie": await commitSession(session)
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