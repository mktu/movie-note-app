import { CookiesProvider } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import toastStyles from 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/lexical.css';
import { StaticLinks, UserMenu } from '~/components/remix-routes/sidebar-items';
import Layout from '~/components/sidebarlayout';
import Sidebar from '~/components/sidebarlayout/sidebar';
import NoteList from '~/features/movie-note/components/note-list';
import LocalStorageProvider from '~/features/movie-note/providers/localstorage';
import { loader } from '~/features/movie-note/server/loaders/app.server';
import Tmdb from '~/features/movie-note/utils/tmdb';
import TmdbProvider from '~/providers/tmdb';
import UserProvider from '~/providers/user';

import { Outlet, useLoaderData, useSubmit } from '@remix-run/react';

export { loader }

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: toastStyles }]
}

export const App: React.FC = () => {
    const { user, tmdbData, movieNoteList, sidebarSettings, movieNoteType } = useLoaderData<typeof loader>()
    const { i18n } = useTranslation('common')
    const submit = useSubmit()
    return (
        <UserProvider user={user}>
            <LocalStorageProvider init={movieNoteType}>
                <CookiesProvider>
                    <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey, i18n.language === 'ja' ? 'ja' : 'en')}>
                        <Layout
                            initialSidebarWidth={sidebarSettings.sidebarWidth}
                            sidebar={<Sidebar
                                staticLinks={<StaticLinks />}
                                userMenu={<UserMenu user={user} onLogout={() => {
                                    submit(null, { action: 'logout', method: 'post' })
                                }} />}
                                noteList={<NoteList
                                    onRemoveNote={(noteId) => {
                                        submit({ noteId }, { action: 'app/delete-note', method: 'post' })
                                    }}
                                    movieNoteList={movieNoteList} />}
                            />}>
                            <Outlet />
                        </Layout>
                        <ToastContainer />
                    </TmdbProvider>
                </CookiesProvider>
            </LocalStorageProvider>
        </UserProvider>
    )
}

export default App