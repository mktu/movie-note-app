import type { LoaderArgs } from "@remix-run/cloudflare";
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


const NewNote: FC = () => {
    const { user } = useLoaderData<typeof loader>()
    return (
        <EditProfile user={user} />
    )
}

export default NewNote