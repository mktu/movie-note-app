import { MovieNotePlaceholder } from '~/features/movie-note';

import { Outlet, useNavigation } from '@remix-run/react';

import type { FC, ReactNode } from 'react'

const AppOutletProvider: FC = () => {
    const navigation = useNavigation();
    let placeholder: ReactNode | null = null
    if (navigation.state === 'loading') {
        if (navigation.location.pathname.includes('notes')) {
            placeholder = <MovieNotePlaceholder />
        }
    }
    return placeholder || <Outlet />
};

export default AppOutletProvider;