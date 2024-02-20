import React from 'react'
import Context from './Context'
import type { UserType } from '~/features/profile/server/db/user.server'

type Props = {
    children: React.ReactNode,
    user: UserType | null
}

const DefaultProvider: React.FC<Props> = ({ children, user }) => {
    return (
        <Context.Provider value={user}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider