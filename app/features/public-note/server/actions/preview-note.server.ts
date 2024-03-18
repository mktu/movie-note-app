import authenticator from '~/features/auth/server/auth.server';
import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddPublicNote } from '../validation/addPublicNote';
import type { UpsertNote } from '../db';
import { upsertPublicNote } from '../db';
import { commitSession, getSession } from '~/features/auth/server/session';
import { PreviewNoteActionResultSessionKey } from '../constants';

type ActionData = {
    error?: string,
    success?: boolean
}
export async function action({ request, context }: ActionFunctionArgs) {

    const uploadHandler = unstable_createMemoryUploadHandler({
        maxPartSize: 5_000_000,
    });
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)

    try {
        const data = parseAddPublicNote(formData)
        const { coverImageFile, tmdbId, useDefaultTopImage } = data
        let upsertData: UpsertNote = { ...data, summary: data.summary || '' }
        if (coverImageFile) {
            const imageId = `cover-image-${user!.id}-${tmdbId}`
            const r2 = context.MovieNoteApp as R2Bucket
            if (!r2) {
                throw Error('R2 is not bound')
            }
            await r2.put(imageId, await coverImageFile.arrayBuffer(), {
                httpMetadata: {
                    contentType: coverImageFile.type
                }
            })
            upsertData.coverImage = `/api/images/${imageId}`
        } else if (useDefaultTopImage) {
            upsertData.coverImage = null
        }
        await upsertPublicNote(supabaseAdmin, upsertData, user.id)
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