import type { FilterType, SortType } from "../../type-defs"

export const putUserSetting = (payload: { key: string, value: string }) => {
    return fetch(`/api/preferences`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
}

export const getMovieNoteList = (sortType: SortType, filterType: FilterType) => {
    const params = { sortType, filterType };
    const searchParams = new URLSearchParams(params).toString();
    return fetch(`/api/notes?${searchParams}`, {
        credentials: 'same-origin'
    })
}