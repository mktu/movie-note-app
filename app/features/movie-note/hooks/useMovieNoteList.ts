import { useCallback, useState } from "react"
import type { MovieListType } from "../server/db"

export type SortType =
    'updated-at-asc' |
    'updated-at-desc' |
    'created-at-asc' |
    'created-at-desc'

export type FilterType =
    'watched' |
    'lookforward' |
    'all'

export const useMovieNoteList = (initMovieNoteList: MovieListType) => {
    const [sortType, setSortType] = useState<SortType>('updated-at-desc')
    const [filterType, setFilterType] = useState<FilterType>('all')
    const [movieNoteList, setMovieNoteList] = useState(initMovieNoteList)
    const fetchMovieNoteList = useCallback(async (sortType: SortType, filterType: FilterType) => {
        const params = { sortType, filterType };
        const searchParams = new URLSearchParams(params).toString();
        const ret = await fetch(`/api/notes?${searchParams}`, {
            credentials: 'same-origin'
        })
        setMovieNoteList((await ret.json<{ movieNoteList: typeof movieNoteList }>()).movieNoteList)
    }, [])
    const selectFilterType = useCallback((filterType: FilterType) => {
        setFilterType(filterType)
        fetchMovieNoteList(sortType, filterType)
    }, [fetchMovieNoteList, sortType])
    const selectSortType = useCallback((sortType: SortType) => {
        setSortType(sortType)
        fetchMovieNoteList(sortType, filterType)
    }, [fetchMovieNoteList, filterType])
    return {
        selectSortType,
        selectFilterType,
        movieNoteList,
        sortType,
        filterType,
    }
}