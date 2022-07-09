import React from 'react'
import type Tmdb from '~/features/movie-note/utils/tmdb'
import Context from './Context'

type Props = {
    children: React.ReactNode,
    tmdb: Tmdb
}

const DefaultProvider: React.FC<Props> = ({ tmdb, children }) => {
    return (
        <Context.Provider value={tmdb}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider