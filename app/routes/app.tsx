import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@type-defs/index";
import { isAuthenticated, getAuthenticatorFromContext } from '@utils/auth/google'
import { getSupabaseAdmin, userDb } from '@utils/db/server/index.server'
import UserProvider from '~/providers/user'

type LoaderData = {
    user: User
}

export const loader: LoaderFunction = async ({ request, context }) => {
    const auth = getAuthenticatorFromContext(context)
    const authUser = await isAuthenticated(auth, request)

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
        </UserProvider>
    )
}

export default App