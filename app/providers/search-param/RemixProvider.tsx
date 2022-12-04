import React, { useCallback } from 'react'
import Context from './Context'
import type { ContextType } from './Context'
import { useSearchParams } from '@remix-run/react'

type Props = {
    children: React.ReactNode,
}

const useSearchParamsWrapper = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const setSearchParamsWrapper = useCallback((param: URLSearchParams | Record<string, string | string[]>) => {
        setSearchParams(param)
    }, [setSearchParams])
    return {
        searchParams,
        setSearchParams: setSearchParamsWrapper
    }
}


const RemixProvider: React.FC<Props> = ({ children }) => {
    const { searchParams, setSearchParams } = useSearchParamsWrapper()
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

export default RemixProvider