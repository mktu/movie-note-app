import type { LoaderArgs } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { User } from "@type-defs/backend";

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
