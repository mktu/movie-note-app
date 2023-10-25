import authenticator from '~/features/auth/server/auth.server';
import { publishNote } from '~/features/movie-note/server/db';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parsePublishNote } from '../validation/parsePublish';

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
        const data = parsePublishNote(await request.formData())
        await publishNote(supabaseAdmin, data, user.id)
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