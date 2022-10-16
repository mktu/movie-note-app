import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
import { unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';

import { json, redirect } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getSupabaseAdmin, userDb } from '@utils/server/db/index.server';

import type { User } from "@type-defs/backend";
import type { FC } from "react";
import { EditProfile } from "~/features/profile";

interface LorderData {
    user: User
}
interface ActionData {
    error?: string
}

export async function loader({ request, context }: LoaderArgs) {
    const authUser = await authenticator.isAuthenticated(request)
    if (!authUser) {
        return redirect('/login')
    }
    const adminDb = getSupabaseAdmin(context)
    const user = await userDb.getUser(adminDb, authUser.id)
    if (!user) {
        return redirect('/register')
    }
    return json<LorderData>({
        user
    })

}

export async function action({ request, context }: ActionArgs) {
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
        return redirect('/app')
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};


const NewNote: FC = () => {
    const { user } = useLoaderData<typeof loader>()
    return (
        <EditProfile user={user} />
    )
}

export default NewNote