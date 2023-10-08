import type { StoredMovieNote } from "../type-defs"

const MOVIE_NOTE_STATE_KEY = 'movie-note-satate'
const IS_NOTE_KV_DISABLED = 'note-kv-disabled'
const MOVIE_NOTE_PREVIEW_HTML = 'movie-note-preview-html'

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

export const setMovieNotePreviewHtml = (previewHtml: string) => {
    localStorage.setItem(MOVIE_NOTE_PREVIEW_HTML, previewHtml)
}

export const getMovieNotePreviewHtml = () => {
    return localStorage.getItem(MOVIE_NOTE_PREVIEW_HTML)
}

export const getMovieNoteState = () => {
    const ret = localStorage.getItem(MOVIE_NOTE_STATE_KEY)
    if (ret) {
        return JSON.parse(ret) as StoredMovieNote
    }
    return null
}