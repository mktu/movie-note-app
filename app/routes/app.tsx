import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@type-defs/index";
import authenticator from '@utils/auth/auth.server'
import { getSupabaseAdmin, userDb } from '@utils/db/server/index.server'
import UserProvider from '~/providers/user'
import TmdbProvider from '~/providers/tmdb'
import Layout from '~/features/movie-note/components/Layout'
import Tmdb, { setTmdbData } from "~/features/movie-note/utils/tmdb";


type LoaderData = {
    user: User,
    tmdbData: ReturnType<typeof setTmdbData>
}

export const loader: LoaderFunction = async ({ request, context }) => {
    const authUser = await authenticator.isAuthenticated(request)

    if (!authUser) {
        return redirect('/login')
    }
    const dbAdmin = getSupabaseAdmin(context)
    const user = await userDb.getUser(dbAdmin, authUser.id)
    if (!user) {
        return redirect('/register') // TBD
    }
    const tmdbData = setTmdbData(context)
    return json<LoaderData>({
        user,
        tmdbData
    })
};


export const App: React.FC = () => {
    const { user, tmdbData } = useLoaderData() as LoaderData;
    return (
        <UserProvider user={user}>
            <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey)}>
                <Layout>
                    <Outlet />
                </Layout>
            </TmdbProvider>
        </UserProvider>
    )
}

export default App