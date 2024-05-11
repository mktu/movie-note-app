import { GeneralError } from '~/components/error';
import { PublicNote } from '~/features/public-note/pages';
import { loader } from '~/features/public-note/server/loaders/public-note.server';
import toastStyles from 'react-toastify/dist/ReactToastify.css?url';
import UserProvider from '~/providers/user';

import { useLoaderData } from '@remix-run/react';

import type { FC } from 'react';
import { CookiesProvider } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import { NavigationLayout } from '~/components/navigationlayout';
import LoginMenu from '~/components/navigationlayout/LoginMenu';
import UserMenu from '~/components/navigationlayout/UserMenu';
import { convertPublicNote, convertUser } from '~/features/public-note/utils/convertType';

export {
    loader
}

export function links() {
    return [{ rel: "stylesheet", href: toastStyles }]
}

const PublicNotePage: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    // tbd global navigation menu
    return (
        <CookiesProvider>
            <UserProvider user={loaderData.loginUser || null}>
                <NavigationLayout userMenu={
                    loaderData.loginUser ? <UserMenu /> : <LoginMenu />
                }>
                    <>
                        {loaderData.error && (
                            <GeneralError key={loaderData.error} />
                        )}
                        {loaderData.content?.tmdbDetail.id && loaderData.content.publicNote && (
                            <PublicNote
                                publicNote={convertPublicNote(loaderData.content.publicNote)}
                                creator={convertUser(loaderData.content.creator)}
                                tmdbDetail={loaderData.content?.tmdbDetail}
                            />
                        )}
                    </>
                </NavigationLayout>
            </UserProvider>
            <ToastContainer
                hideProgressBar
                pauseOnHover
            />
        </CookiesProvider>

    )
}

export default PublicNotePage 