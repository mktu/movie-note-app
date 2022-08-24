import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { User } from "@type-defs/backend/index";
import authenticator from '@utils/auth/auth.server'
import { getSupabaseAdmin, userDb } from '@utils/db/server/index.server'
import UserProvider from '~/providers/user'
import TmdbProvider from '~/providers/tmdb'
import Layout from '~/features/movie-note/components/layout'
import Sidebar from '~/features/movie-note/components/sidebar'
import Tmdb, { setTmdbData } from "~/features/movie-note/utils/tmdb";
import { useTranslation } from "react-i18next";
import styles from 'styles/lexical.css'


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

export function links() {
    return [{ rel: "stylesheet", href: styles }]
}


export const App: React.FC = () => {
    const { user, tmdbData } = useLoaderData() as LoaderData;
    const { i18n } = useTranslation('common')
    return (
        <UserProvider user={user}>
            <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey, i18n.language === 'ja' ? 'ja' : 'en')}>
                <Layout sidebar={<Sidebar />}>
                    <Outlet />
                </Layout>
            </TmdbProvider>
        </UserProvider>
    )
}

export default App