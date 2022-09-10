import type { LoaderFunction } from "@remix-run/cloudflare";
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import toastStyles from 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/lexical.css';
import Layout from '~/components/sidebarlayout';
import authenticator from '~/features/auth/server/auth.server';
import Sidebar from '~/components/sidebarlayout/sidebar';
import { listMovieNote } from '~/features/movie-note/server/db';
import Tmdb, { setTmdbData } from '~/features/movie-note/utils/tmdb';
import TmdbProvider from '~/providers/tmdb';
import UserProvider from '~/providers/user';

import { json, redirect } from '@remix-run/cloudflare';
import { Outlet, useLoaderData, useSubmit } from '@remix-run/react';
import { getSupabaseAdmin, userDb } from '@utils/server/db/index.server';

import type { MovieNoteListViewItem, User } from "@type-defs/backend/index";
import NoteList from "~/features/movie-note/components/note-list";
import { StaticLinks, UserMenu } from "~/components/remix-routes/sidebar-items";

type LoaderData = {
    user: User,
    tmdbData: ReturnType<typeof setTmdbData>,
    movieNoteList: MovieNoteListViewItem[]
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
    const movieNoteList = await listMovieNote(dbAdmin, authUser.id)
    return json<LoaderData>({
        user,
        tmdbData,
        movieNoteList
    })
};

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: toastStyles }]
}


export const App: React.FC = () => {
    const { user, tmdbData, movieNoteList } = useLoaderData() as LoaderData;
    const { i18n } = useTranslation('common')
    const submit = useSubmit()
    return (
        <UserProvider user={user}>
            <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey, i18n.language === 'ja' ? 'ja' : 'en')}>
                <Layout sidebar={<Sidebar
                    staticLinks={<StaticLinks />}
                    userMenu={<UserMenu user={user} onLogout={() => {
                        submit(null, { action: 'logout', method: 'post' })
                    }} />}
                    noteList={<NoteList
                        movieNoteList={movieNoteList} />}
                />}>
                    <Outlet />
                </Layout>
                <ToastContainer />
            </TmdbProvider>
        </UserProvider>
    )
}

export default App