import { useCallback, useContext, useEffect, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { SearchMovieResult, SearchActorResult } from '~/features/tmdb'

const useSearchBase = <T>(searchFunc: (query: string) => Promise<T>, init?: T) => {
    const [query, setQuery] = useState('')
    const [count, setCount] = useState(0) // this is for debug
    const [searchResult, setSearchResult] = useState<T | null>(init || null)
    useEffect(() => {
        let ignore = false
        if (!query) {
            setSearchResult(null)
            return
        }
        setTimeout(() => {
            if (ignore) {
                return
            }
            setCount(b => b + 1)
            searchFunc(query).then(v => {
                if (ignore) {
                    return
                }
                setSearchResult(v)
            })
        }, 1000);
        return () => {
            ignore = true
        }
    }, [searchFunc, query])
    return {
        query,
        setQuery,
        searchResult,
        count
    }
}

const useMovieSearch = (init?: SearchMovieResult) => {
    const tmdb = useContext(TmdbContext)
    const func = useCallback(async (query: string) => {
        return await tmdb.search(query)
    }, [tmdb])
    return useSearchBase(func, init)
}

const useActorSearch = (init?: SearchActorResult) => {
    const tmdb = useContext(TmdbContext)
    const func = useCallback(async (query: string) => {
        return await tmdb.searchActor(query)
    }, [tmdb])
    return useSearchBase(func, init)
}

export {
    useMovieSearch,
    useActorSearch
}