import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import type { FilterType, SortType } from "../../type-defs";
import { putUserSetting } from "../../utils/api";

export const movieNoteSortType = atom<SortType>({
    key: 'movieNoteSortType',
    default: 'created-at-desc'
});

export const movieNoteFilterType = atom<FilterType>({
    key: 'movieNoteFilterType',
    default: 'all'
});

export const useUserSettings = () => {
    const [filterType, setFilterType] = useRecoilState(movieNoteFilterType)
    const setFilterTypeAndSave = useCallback((filterType: FilterType) => {
        let oldData: FilterType;
        setFilterType(before => {
            oldData = before
            return filterType
        })
        putUserSetting({
            key: "filterType",
            value: filterType,
        }).catch(() => {
            oldData && setFilterType(oldData)
        })
    }, [setFilterType])

    return {
        filterType,
        setFilterTypeAndSave,
    }
}