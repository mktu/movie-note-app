import React from 'react'
import Context from './Context'
import { useAppLayout } from './useAppLayout';

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const values = useAppLayout()
    return (
        <Context.Provider value={values}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider