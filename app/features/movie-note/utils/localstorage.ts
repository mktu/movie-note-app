import type { StoredMovieNote } from "../type-defs"

const MOVIE_NOTE_STATE_KEY = 'movie-note-satate'
const IS_NOTE_KV_DISABLED = 'note-kv-disabled'

export const saveMovieNoteState = (state: StoredMovieNote) => {
    localStorage.setItem(MOVIE_NOTE_STATE_KEY, JSON.stringify(state))
}

export const removeMovieNoteState = () => {
    localStorage.removeItem(MOVIE_NOTE_STATE_KEY)
}

export const isMovieNoteKvDisabled = () => {
    const ret = localStorage.getItem(IS_NOTE_KV_DISABLED)
    return ret ? ret.toLowerCase() === 'true' : false
}

export const setMovieNoteKvDisabled = (disabled: boolean) => {
    localStorage.setItem(IS_NOTE_KV_DISABLED, String(disabled))
}

export const getMovieNoteState = () => {
    const ret = localStorage.getItem(MOVIE_NOTE_STATE_KEY)
    if (ret) {
        return JSON.parse(ret) as StoredMovieNote
    }
    return null
}