import { useCallback } from "react"
import { atom, useRecoilState } from "recoil";
import type { MovieListType } from "../../server/db"
import type { FilterType, SortType } from "../../type-defs";
import { getMovieNoteList } from "../../utils/api";
import { useUserSettings } from "./userSettings";

export const movieNoteListType = atom<MovieListType>({
    key: 'movieNoteListType',
    default: []
});

export const useMovieNoteList = () => {

    const [movieNoteList, setMovieNoteList] = useRecoilState(movieNoteListType)
    const { sortType, filterType, setFilterTypeAndSave, setSortTypeAndSave } = useUserSettings()
    const fetchMovieNoteList = useCallback(async (sortType: SortType, filterType: FilterType) => {
        const ret = await getMovieNoteList(sortType, filterType)
        setMovieNoteList((await ret.json<{ movieNoteList: typeof movieNoteList }>()).movieNoteList)
    }, [setMovieNoteList])

    const refetchNoteList = useCallback(() => {
        fetchMovieNoteList(sortType, filterType);
    }, [fetchMovieNoteList, sortType, filterType])

    const updateSortType = useCallback((sortType: SortType) => {
        setSortTypeAndSave(sortType)
        fetchMovieNoteList(sortType, filterType)
    }, [setSortTypeAndSave, fetchMovieNoteList, filterType])

    const updateFilterType = useCallback((filterType: FilterType) => {
        setFilterTypeAndSave(filterType)
        fetchMovieNoteList(sortType, filterType)
    }, [fetchMovieNoteList, setFilterTypeAndSave, sortType])
    return {
        updateSortType,
        updateFilterType,
        setMovieNoteList,
        refetchNoteList,
        movieNoteList,
        sortType,
        filterType,
    }
}