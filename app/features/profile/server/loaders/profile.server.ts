import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { UserType } from "../db/user.server";

interface LorderData {
    user: UserType
}

export async function loader({ request, context }: LoaderFunctionArgs) {
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
