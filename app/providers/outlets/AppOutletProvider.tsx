import { MovieNotePlaceholder } from '~/features/movie-note';

import { Outlet, useTransition } from '@remix-run/react';

import type { FC, ReactNode } from 'react'

const AppOutletProvider: FC = () => {
    const transition = useTransition();
    let placeholder: ReactNode | null = null
    if (transition.state === 'loading') {
        if (transition.location.pathname.includes('notes')) {
            placeholder = <MovieNotePlaceholder />
        }
    }
    return placeholder || <Outlet />
};

export default AppOutletProvider;