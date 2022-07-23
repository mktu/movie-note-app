import { useContext, useEffect, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { SearchResult } from "../../utils/tmdb"

const useTmdb = () => {
    const [query, setQuery] = useState('')
    const [count, setCount] = useState(0)
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
    const tmdb = useContext(TmdbContext)
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
            tmdb.search(query)
                .then((result) => {
                    if (ignore) {
                        return
                    }
                    setSearchResult(result)
                })
        }, 1000);
        return () => {
            ignore = true
        }
    }, [query, tmdb])
    return {
        query,
        setQuery,
        searchResult,
        count
    }
}

export default useTmdb