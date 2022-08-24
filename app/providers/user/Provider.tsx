import React from 'react'
import type { User } from '@type-defs/backend/index'
import Context from './Context'

type Props = {
    children: React.ReactNode,
    user: User
}

const DefaultProvider: React.FC<Props> = ({ children, user }) => {
    return (
        <Context.Provider value={user}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider