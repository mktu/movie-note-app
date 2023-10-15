import React from 'react'
import type { MovieNoteContextType } from './Context';
import Context from './Context'

type Props = {
    children: React.ReactNode,
    movieNote: MovieNoteContextType
}

const DefaultProvider: React.FC<Props> = ({ children, movieNote }) => {
    return (
        <Context.Provider value={movieNote}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider