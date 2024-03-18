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
import { Tmdb } from '~/features/tmdb';
import { UserMenu } from '~/features/profile/components/user-menu';
import { AppOutletProvider } from '~/providers/outlets';
import TmdbProvider from '~/providers/tmdb';
import UserProvider from '~/providers/user';

import { useLoaderData, useMatches, useSubmit } from '@remix-run/react';
import { SearchMenu } from '~/features/movie';
import TemplateList from '~/features/note-template/components/template-list';

export { loader }

export function links() {
    return [{ rel: "stylesheet", href: styles }, { rel: "stylesheet", href: toastStyles }]
}

export const App: React.FC = () => {
    const { user, tmdbData, movieNoteList, sidebarSettings, movieNoteType, templateList } = useLoaderData<typeof loader>()
    const { i18n } = useTranslation('common')
    const submit = useSubmit()
    const matches = useMatches();
    const currentPath = matches[2].pathname
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
                                searchMenu={<SearchMenu />}
                                userMenu={<UserMenu user={user} onLogout={() => {
                                    submit(null, { action: '/logout', method: 'post' })
                                }} />}
                                noteList={<NoteList
                                    onRemoveNote={(noteId) => {
                                        submit({ noteId }, { action: '/app/delete-note', method: 'post' })
                                    }}
                                    movieNoteList={movieNoteList} />}
                                templateList={<TemplateList
                                    templateList={templateList}
                                    onRemoveNote={(templateId) => {
                                        submit({ templateId, redirectTo: currentPath.includes(String(templateId)) ? '/app' : currentPath }, { action: '/app/note-template/delete', method: 'post' })
                                    }}
                                />}
                            >
                                <AppOutletProvider />
                            </SidebarLayout>
                            <ToastContainer
                                hideProgressBar
                                pauseOnHover
                                position='bottom-right'
                            />
                        </TmdbProvider>
                    </CookiesProvider>
                </LocalStorageProvider>
            </UserProvider>
        </RecoilRoot>
    )
}

export default App