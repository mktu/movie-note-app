import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@type-defs/index";
import authenticator from '@utils/auth/auth.server'
import { getSupabaseAdmin, userDb } from '@utils/db/server/index.server'
import UserProvider from '~/providers/user'

type LoaderData = {
    user: User
}

export const loader: LoaderFunction = async ({ request, context }) => {
    const authUser = await authenticator.isAuthenticated(request)

    if (!authUser) {
        return redirect('/login')
    }
    const dbAdmin = getSupabaseAdmin(context)
    const user = await userDb.getUser(dbAdmin, authUser.id)
    if (!user) {
        return redirect('/login') // TBD
    }
    return json<LoaderData>({
        user
    })
};


export const App: React.FC = () => {
    const { user } = useLoaderData() as LoaderData;
    return (
        <UserProvider user={user}>
            <Outlet />
            <Form action='/logout' method='post'>
                <button>Logout</button>
            </Form>
        </UserProvider>
    )
}

export default App