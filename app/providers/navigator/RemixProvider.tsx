import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import React from 'react'
import Context from './Context'
import type { ContextType, NavigatorProps } from './Context'
import LocalStorageContext from '../localstorage/Context'
import { useNavigate, NavLink } from '@remix-run/react'

type Props = {
    children: React.ReactNode,
}

export const Navigator: FC<NavigatorProps> = ({ to, children, className }) => {
    const { isKvDisabled } = useContext(LocalStorageContext)
    const [pathWithKvOption, set] = useState(to)
    // To avoid csr and ssr mismatch
    useEffect(() => {
        set(isKvDisabled() ? `${to}?disableKv=true` : to)
    }, [isKvDisabled, to])
    return (
        <NavLink className={className} to={pathWithKvOption} >{children}</NavLink>
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