import { CookiesProvider } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import toastStyles from 'react-toastify/dist/ReactToastify.css';
import styles from 'styles/lexical.css';
import { UserMenu } from '~/features/profile/components/user-menu';
import SidebarLayout from '~/components/sidebarlayout';
import NoteList from '~/features/movie-note/components/note-list';
import LocalStorageProvider from '~/features/movie-note/providers/localstorage';
import { loader } from '~/features/movie-note/server/loaders/app.server';
import Tmdb from '~/features/movie-note/utils/tmdb';
import TmdbProvider from '~/providers/tmdb';
import UserProvider from '~/providers/user';
import { RecoilRoot } from 'recoil';

import { Outlet, useLoaderData, useSubmit } from '@remix-run/react';
import { movieDetailType } from '~/features/movie-note/store/cookie/movieDetailType';

export { loader }

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: toastStyles }]
}

export const App: React.FC = () => {
    const { user, tmdbData, movieNoteList, sidebarSettings, movieNoteType } = useLoaderData<typeof loader>()
    const { i18n } = useTranslation('common')
    const submit = useSubmit()
    return (
        <RecoilRoot initializeState={({ set }) => {
            set(movieDetailType, movieNoteType.movieNoteType)
        }}>
            <UserProvider user={user}>
                <LocalStorageProvider init={movieNoteType}>
                    <CookiesProvider>
                        <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey, i18n.language === 'ja' ? 'ja' : 'en')}>
                            <SidebarLayout
                                initialSidebarWidth={sidebarSettings.sidebarWidth}
                                userMenu={<UserMenu user={user} onLogout={() => {
                                    submit(null, { action: 'logout', method: 'post' })
                                }} />}
                                noteList={<NoteList
                                    onRemoveNote={(noteId) => {
                                        submit({ noteId }, { action: 'app/delete-note', method: 'post' })
                                    }}
                                    movieNoteList={movieNoteList} />}>
                                <Outlet />
                            </SidebarLayout>
                            <ToastContainer />
                        </TmdbProvider>
                    </CookiesProvider>
                </LocalStorageProvider>
            </UserProvider>
        </RecoilRoot>
    )
}

export default App