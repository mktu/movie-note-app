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

export const getMovieNoteList = (filterType: FilterType) => {
    const params = { filterType };
    const searchParams = new URLSearchParams(params).toString();
    return fetch(`/api/notes?${searchParams}`, {
        credentials: 'same-origin'
    })
}

export const sortMovieNote = (sortType: SortType) => {
    const body = { sortType }
    return fetch(`/api/notes/sortAll`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
}

export const getTemplates = async (tmdbId: string) => {
    return fetch(`/api/notes/templates/${tmdbId}`)
}