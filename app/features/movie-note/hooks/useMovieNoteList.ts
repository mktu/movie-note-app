import { useCallback, useState } from "react"
import type { MovieListType } from "../server/db"

export type SortType =
    'updated-at-asc' |
    'updated-at-desc' |
    'created-at-asc' |
    'created-at-desc'

export const useMovieNoteList = (initMovieNoteList: MovieListType) => {
    const [sortType, setSortType] = useState<SortType>('updated-at-desc')
    const [movieNoteList, setMovieNoteList] = useState(initMovieNoteList)
    const fetchMovieNoteList = useCallback(async (sortType: SortType) => {
        const params = { sortType };
        const searchParams = new URLSearchParams(params).toString();
        const ret = await fetch(`/api/notes?${searchParams}`, {
            credentials: 'same-origin'
        })
        setMovieNoteList((await ret.json<{ movieNoteList: typeof movieNoteList }>()).movieNoteList)
    }, [])
    const selectSortType = useCallback((sortType: SortType) => {
        setSortType(sortType)
        fetchMovieNoteList(sortType)
    }, [fetchMovieNoteList])
    return {
        selectSortType,
        movieNoteList,
        sortType
    }
}