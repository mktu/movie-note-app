import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import authenticator from '~/features/auth/server/auth.server'
import { hasAuth } from "~/features/auth/server/db";
import { getSupabaseAdmin, userDb } from '@utils/server/db/index.server'
import Layout from "~/features/auth/components/Layout";
import Register from '~/features/auth/components/register'

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

export const action: ActionFunction = async ({ request, context }) => {
    const formData = await request.formData()
    const adminDb = getSupabaseAdmin(context)
    const name = formData.get("nickname") as string || ''
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    try {
        await userDb.registerUser(adminDb, user?.id, name)
        return redirect('/app')
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};

export default function Index() {
    const { confirmed } = useLoaderData<LorderData>()
    return (
        <Layout titleMessage="register-title-message">
            <Register confirmed={confirmed} />
        </Layout>
    );
}
