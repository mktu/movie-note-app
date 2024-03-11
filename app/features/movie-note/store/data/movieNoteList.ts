import { useCallback } from "react"
import { atom, useRecoilState } from "recoil";
import type { MovieListType } from "../../server/db"
import type { FilterType, SortType } from "../../type-defs";
import { getMovieNoteList, sortMovieNote } from "../../utils/api";
import { useUserSettings } from "./userSettings";

export const movieNoteListType = atom<MovieListType>({
    key: 'movieNoteListType',
    default: []
});

export const useMovieNoteList = () => {

    const [movieNoteList, setMovieNoteList] = useRecoilState(movieNoteListType)
    const { filterType, setFilterTypeAndSave } = useUserSettings()
    const fetchMovieNoteList = useCallback(async (filterType: FilterType) => {
        const ret = await getMovieNoteList(filterType)
        setMovieNoteList((await ret.json<{ movieNoteList: typeof movieNoteList }>()).movieNoteList)
    }, [setMovieNoteList])

    const refetchNoteList = useCallback(() => {
        fetchMovieNoteList(filterType);
    }, [fetchMovieNoteList, filterType])

    const updateSortType = useCallback(async (sortType: SortType) => {
        await sortMovieNote(sortType)
        fetchMovieNoteList(filterType)
    }, [fetchMovieNoteList, filterType])

    const updateFilterType = useCallback((filterType: FilterType) => {
        setFilterTypeAndSave(filterType)
        fetchMovieNoteList(filterType)
    }, [fetchMovieNoteList, setFilterTypeAndSave])
    return {
        updateSortType,
        updateFilterType,
        setMovieNoteList,
        refetchNoteList,
        movieNoteList,
        filterType,
    }
}