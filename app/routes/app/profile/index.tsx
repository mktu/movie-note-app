import type { ActionArgs, LoaderArgs } from "@remix-run/cloudflare";
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
    const formData = await request.formData()
    const adminDb = getSupabaseAdmin(context)
    const name = formData.get("nickname") as string || ''
    const comment = formData.get("comment") as string || ''
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    try {
        await userDb.updateUser(adminDb, { authId: user!.id, name, comment })
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