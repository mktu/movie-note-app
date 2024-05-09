import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { userDb } from '~/features/profile/server/db';

import {
    json, redirect, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData
} from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';
import { initServerContext } from "~/features/auth/server/init.server";

interface ActionData {
    error?: string,
    succeeded?: boolean
}

export async function action({ request, context }: ActionFunctionArgs) {
    try {
        const { authenticator } = initServerContext(context)
        const uploadHandler = unstable_createMemoryUploadHandler({
            maxPartSize: 5_000_000,
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

        let image = ''
        if (file) {
            const { cloudflare: { env: { MovieNoteApp: r2 } } } = context
            const imageId = `profile-${user!.id}`
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