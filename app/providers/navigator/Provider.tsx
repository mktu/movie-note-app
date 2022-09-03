import React from 'react'
import Context, { Navigator, useNavigator } from './Context'
import type { ContextType } from './Context'

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const value: ContextType = {
        navigator: Navigator,
        useNavigator
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider