import type { StoredMovieNote } from "../type-defs"

const MOVIE_NOTE_STATE_KEY = 'movie-note-satate'
const IS_NOTE_KV_DISABLED = 'note-kv-disabled'
const MOVIE_NOTE_PREVIEW_HTML = 'movie-note-preview-html'
const MOVIE_NOTE = 'movie-note'

const isBrowser = () => typeof window !== 'undefined'

export const saveMovieNoteState = (state: StoredMovieNote) => {
    localStorage.setItem(MOVIE_NOTE_STATE_KEY, JSON.stringify(state))
}

export const removeMovieNoteState = () => {
    localStorage.removeItem(MOVIE_NOTE_STATE_KEY)
}

export const isMovieNoteKvDisabled = () => {
    if (!isBrowser()) {
        return false
    }
    const ret = localStorage.getItem(IS_NOTE_KV_DISABLED)
    return ret ? ret.toLowerCase() === 'true' : false
}

export const setMovieNoteKvDisabled = (disabled: boolean) => {
    if (isBrowser()) {
        localStorage.setItem(IS_NOTE_KV_DISABLED, String(disabled))
    }
}

export const setMovieNotePreviewHtml = (previewHtml: string) => {
    if (isBrowser()) {
        localStorage.setItem(MOVIE_NOTE_PREVIEW_HTML, previewHtml)
    }
}

export const getMovieNotePreviewHtml = () => {
    if (!isBrowser()) {
        return false
    }
    return localStorage.getItem(MOVIE_NOTE_PREVIEW_HTML)
}

export const getMovieNoteState = () => {
    if (!isBrowser()) {
        return null
    }
    const ret = localStorage.getItem(MOVIE_NOTE_STATE_KEY)
    if (ret) {
        return JSON.parse(ret) as StoredMovieNote
    }
    return null
}

export type MovieNoteInLocalstorage = {
    id: string,
    note: string
}

export const saveMovieNote = (id: string, note: string) => {
    if (!isBrowser()) {
        return
    }
    localStorage.setItem(MOVIE_NOTE,
        JSON.stringify({
            id, note
        }))
}

export const saveMovieNoteIfNotExists = (id: string, note: string) => {
    if (!isBrowser()) {
        return
    }
    const ret = getMovieNote()
    if (!ret || (ret && ret.id === id)) {
        saveMovieNote(id, note)
    }
}

export const getMovieNote = () => {
    if (!isBrowser()) {
        return null
    }
    const ret = localStorage.getItem(MOVIE_NOTE)
    if (ret) {
        return JSON.parse(ret) as MovieNoteInLocalstorage
    }
    return null
}

export const clearMovieNote = () => {
    if (!isBrowser()) {
        return
    }
    localStorage.removeItem(MOVIE_NOTE)
}