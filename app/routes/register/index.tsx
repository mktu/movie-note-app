import type { ActionArgs, LoaderFunction } from "@remix-run/cloudflare";
import Layout from '~/features/auth/components/Layout';
import authenticator from '~/features/auth/server/auth.server';
import { hasAuth } from '~/features/auth/server/db';
import { Register } from '~/features/profile/pages';
import { userDb } from '~/features/profile/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { useActionData, useLoaderData } from '@remix-run/react';
import { getSupabaseAdmin } from '@utils/server/db';

interface ActionData {
    error?: string
}

interface LorderData {
    confirmed: boolean
}

export const loader: LoaderFunction = async ({ request, context }) => {
    const user = await authenticator.isAuthenticated(request)
    if (!user) {
        return redirect('/login')
    }
    const adminDb = getSupabaseAdmin(context)
    if (await hasAuth(adminDb, user.id)) {
        return redirect('/app')
    }
    if (user.provider === 'email') {
        const dbUser = await adminDb.auth.api.getUserById(user.id)
        return json<LorderData>({
            confirmed: Boolean(dbUser.data?.email_confirmed_at || dbUser.data?.confirmed_at)
        })
    }
    return json<LorderData>({
        confirmed: true
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
        await userDb.registerUser(adminDb, { authId: user!.id, name, comment })
        return redirect('/app')
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};

export default function Index() {
    const { confirmed } = useLoaderData<LorderData>()
    const actionData = useActionData<typeof action>()
    return (
        <Layout titleMessage="register-title-message">
            <Register confirmed={confirmed} error={actionData?.error} />
        </Layout>
    );
}
