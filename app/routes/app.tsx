import { CookiesProvider } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import toastStyles from 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import styles from 'styles/lexical.css';
import SidebarLayout from '~/components/sidebarlayout';
import NoteList from '~/features/movie-note/components/note-list';
import LocalStorageProvider from '~/features/movie-note/providers/localstorage';
import { loader } from '~/features/movie-note/server/loaders/app.server';
import { movieDetailType } from '~/features/movie-note/store/cookie/movieDetailType';
import Tmdb from '~/features/movie-note/utils/tmdb';
import { UserMenu } from '~/features/profile/components/user-menu';
import { AppOutletProvider } from '~/providers/outlets';
import TmdbProvider from '~/providers/tmdb';
import UserProvider from '~/providers/user';

import { useLoaderData, useSubmit } from '@remix-run/react';

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
                <LocalStorageProvider>
                    <CookiesProvider>
                        <TmdbProvider tmdb={new Tmdb(tmdbData.apiKey, i18n.language === 'ja' ? 'ja' : 'en')}>
                            <SidebarLayout
                                initialSidebarWidth={sidebarSettings.sidebarWidth}
                                userMenu={<UserMenu user={user} onLogout={() => {
                                    submit(null, { action: '/logout', method: 'post' })
                                }} />}
                                noteList={<NoteList
                                    onRemoveNote={(noteId) => {
                                        submit({ noteId }, { action: 'app/delete-note', method: 'post' })
                                    }}
                                    movieNoteList={movieNoteList} />}>
                                <AppOutletProvider />
                            </SidebarLayout>
                            <ToastContainer
                                hideProgressBar
                                pauseOnHover
                            />
                        </TmdbProvider>
                    </CookiesProvider>
                </LocalStorageProvider>
            </UserProvider>
        </RecoilRoot>
    )
}

export default App