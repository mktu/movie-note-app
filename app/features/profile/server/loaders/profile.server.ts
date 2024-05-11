import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/server/db';

import type { UserType } from "../db/user.server";
import { initServerContext } from "~/features/auth/server/init.server";

interface LorderData {
    user: UserType
}

export async function loader({ request, context }: LoaderFunctionArgs) {
    const { authenticator } = initServerContext(context)
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
