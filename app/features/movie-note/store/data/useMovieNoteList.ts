import { useCallback } from "react"
import { atom, useRecoilState } from "recoil";
import type { MovieListType } from "../../server/db"

export type SortType =
    'updated-at-asc' |
    'updated-at-desc' |
    'created-at-asc' |
    'created-at-desc'

export type FilterType =
    'watched' |
    'lookforward' |
    'all'

export const movieNoteSortType = atom<SortType>({
    key: 'movieNoteSortType',
    default: 'created-at-desc'
});

export const movieNoteFilterType = atom<FilterType>({
    key: 'movieNoteFilterType',
    default: 'all'
});

export const movieNoteListType = atom<MovieListType>({
    key: 'movieNoteListType',
    default: []
});

export const useMovieNoteList = () => {
    const [sortType, setSortType] = useRecoilState(movieNoteSortType)
    const [filterType, setFilterType] = useRecoilState(movieNoteFilterType)
    const [movieNoteList, setMovieNoteList] = useRecoilState(movieNoteListType)
    const fetchMovieNoteList = useCallback(async (sortType: SortType, filterType: FilterType) => {
        const params = { sortType, filterType };
        const searchParams = new URLSearchParams(params).toString();
        const ret = await fetch(`/api/notes?${searchParams}`, {
            credentials: 'same-origin'
        })
        setMovieNoteList((await ret.json<{ movieNoteList: typeof movieNoteList }>()).movieNoteList)
    }, [setMovieNoteList])
    const selectFilterType = useCallback((filterType: FilterType) => {
        setFilterType(filterType)
        fetchMovieNoteList(sortType, filterType)
    }, [fetchMovieNoteList, sortType, setFilterType])
    const selectSortType = useCallback((sortType: SortType) => {
        setSortType(sortType)
        fetchMovieNoteList(sortType, filterType)
    }, [fetchMovieNoteList, filterType, setSortType])
    const refetchNoteList = useCallback(() => {
        fetchMovieNoteList(sortType, filterType);
    }, [fetchMovieNoteList, sortType, filterType])
    return {
        selectSortType,
        selectFilterType,
        setMovieNoteList,
        refetchNoteList,
        movieNoteList,
        sortType,
        filterType,
    }
}