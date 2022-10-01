import type { StoredMovieNote } from "../type-defs"

const MOVIE_NOTE_STATE_KEY = 'movie-note-satate'

export const saveMovieNoteState = (state: StoredMovieNote) => {
    localStorage.setItem(MOVIE_NOTE_STATE_KEY, JSON.stringify(state))
}

export const removeMovieNoteState = () => {
    localStorage.removeItem(MOVIE_NOTE_STATE_KEY)
}

export const getMovieNoteState = () => {
    const ret = localStorage.getItem(MOVIE_NOTE_STATE_KEY)
    if (ret) {
        return JSON.parse(ret) as StoredMovieNote
    }
    return null
}