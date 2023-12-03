import authenticator from '~/features/auth/server/auth.server';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddPublicNote } from '../validation/addPublicNote';
import { upsertPublicNote } from '../db';
import { TmdbLng } from '~/features/tmdb';

type ActionData = {
    error?: string,
    success?: boolean
}
export async function action({ request, context }: ActionFunctionArgs) {

    const user = await authenticator.isAuthenticated(request)
    const url = new URL(request.url);
    const isUpdate = url.searchParams.get('update') === 'true'
    const lng: TmdbLng = url.searchParams.get('lng') as TmdbLng || 'ja';

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddPublicNote(await request.formData())
        await upsertPublicNote(supabaseAdmin, data, user.id)
        if (!isUpdate) {
            return redirect(`/app/note-public/${data.tmdbId}?lng=${lng}&update=true`)
        }
        return json<ActionData>({
            success: true
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