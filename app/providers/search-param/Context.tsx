import { createContext, useContext } from 'react';

export type ContextType = {
    setSearchParams: (_: URLSearchParams | Record<string, string | string[]>) => void,
    searchParams: URLSearchParams | Record<string, string | string[]>
}

export const useSearchParam = () => {
    return {
        setSearchParams: () => { },
        searchParams: {}
    } as ContextType
}



const context = createContext<ContextType>({
    setSearchParams: (text) => { },
    searchParams: {}
});


export const useSearchParamContext = () => useContext(context)

export default context;