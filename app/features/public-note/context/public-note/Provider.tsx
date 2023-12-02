import React from 'react'
import Context from './Context'
import type { OnPublish } from '../../hooks/useMovieNotePreview';
import { useMovieNotePreview } from '../../hooks/useMovieNotePreview';
import type { PublicNote } from '@type-defs/frontend';

type Props = {
    children: React.ReactNode,
    onPublish: OnPublish,
    init?: PublicNote
}

const DefaultProvider: React.FC<Props> = ({ children, onPublish, init }) => {
    const contextValue = useMovieNotePreview(onPublish, init)
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider