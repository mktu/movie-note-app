import { MovieNoteError } from '~/features/movie-note/utils/error';

import { json, redirect, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { parseAddPublicNote } from '../validation/addPublicNote';
import type { UpsertNote } from '../db';
import { upsertPublicNote } from '../db';
import { PreviewNoteActionResultSessionKey } from '../constants';
import { initServerContext } from '~/features/auth/server/init.server';

type ActionData = {
    error?: string,
    success?: boolean
}
export async function action({ request, context }: ActionFunctionArgs) {
    const { authenticator, sessionStorage } = initServerContext(context)
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
            const { cloudflare: { env: { MovieNoteApp: r2 } } } = context
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
        const session = await sessionStorage.getSession(
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