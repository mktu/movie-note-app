import React from 'react'
import Context from './Context'
import type { OnPublish } from '../../hooks/useMovieNotePreview';
import { useMovieNotePreview } from '../../hooks/useMovieNotePreview';
import type { PublicNote } from '@type-defs/frontend';
import type { TmdbDetail } from '~/features/tmdb';

type Props = {
    children: React.ReactNode,
    onPublish: OnPublish,
    tmdbDetail: TmdbDetail,
    init?: PublicNote
}

const DefaultProvider: React.FC<Props> = ({ children, onPublish, tmdbDetail, init }) => {
    const contextValue = useMovieNotePreview(onPublish, tmdbDetail, init)
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider