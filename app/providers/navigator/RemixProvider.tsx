import type { FC } from 'react';
import React from 'react'
import Context from './Context'
import type { ContextType, NavigatorProps } from './Context'
import { useNavigate, NavLink } from '@remix-run/react'

type Props = {
    children: React.ReactNode,
}

export const Navigator: FC<NavigatorProps> = ({ to, children, className }) => {
    return (
        <NavLink className={className} to={to} >{children}</NavLink>
    )
}

Navigator.displayName = 'navigator'

const useNavigator = () => {
    const navigate = useNavigate()
    return {
        navigate
    }
}


const RemixProvider: React.FC<Props> = ({ children }) => {
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

export default RemixProvider