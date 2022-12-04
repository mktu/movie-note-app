import React from 'react'
import Context, { useSearchParam } from './Context'
import type { ContextType } from './Context'

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const { searchParams, setSearchParams } = useSearchParam()
    const value: ContextType = {
        searchParams,
        setSearchParams
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider