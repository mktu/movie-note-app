import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { userDb } from '~/features/profile/server/db';

import {
    json, redirect, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData
} from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

interface ActionData {
    error?: string,
    succeeded?: boolean
}

export async function action({ request, context }: ActionFunctionArgs) {
    const uploadHandler = unstable_createMemoryUploadHandler({
        maxPartSize: 500_000,
    });
    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );
    const adminDb = getSupabaseAdmin(context)
    const name = formData.get("nickname") as string || ''
    const comment = formData.get("comment") as string || ''
    const file = formData.get("profile-image") as File;
    const user = await authenticator.isAuthenticated(request)
    if (!user) {
        return redirect('/login')
    }
    try {
        let image = ''
        if (file) {
            const imageId = `profile-${user!.id}`
            const r2 = context.MovieNoteApp as R2Bucket
            if (!r2) {
                throw Error('R2 is not bound')
            }
            await r2.put(imageId, await file.arrayBuffer(), {
                httpMetadata: {
                    contentType: file.type
                }
            })
            image = `/api/images/${imageId}`
        }
        await userDb.updateUser(adminDb, { authId: user!.id, name, comment, image })
        return json<ActionData>({
            succeeded: true
        })
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
}