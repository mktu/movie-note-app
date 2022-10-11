import React from 'react'
import Context, { Form, useTransitionState } from './Context'
import type { ContextType } from './Context'

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const value: ContextType = {
        form: Form,
        useTransitionState
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider