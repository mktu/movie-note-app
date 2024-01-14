import React from 'react'
import Context from './Context'
import type { OnPublish } from '../../hooks/useMovieNotePreview';
import { useMovieNotePreview } from '../../hooks/useMovieNotePreview';
import type { PublicNote } from '@type-defs/frontend';

type Props = {
    children: React.ReactNode,
    onPublish: OnPublish,
    tmdbId: string,
    init?: PublicNote
}

const DefaultProvider: React.FC<Props> = ({ children, onPublish, tmdbId, init }) => {
    const contextValue = useMovieNotePreview(onPublish, tmdbId, init)
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider