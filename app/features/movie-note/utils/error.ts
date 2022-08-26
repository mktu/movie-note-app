type ErrorKey =
    'movie-note-already-registered' |
    'movie-note-not-found' |
    'invalid-movie-note' |
    'backend-error'

const dbErrorCodeMap: { [n: string]: ErrorKey } = {
    '23505': 'movie-note-already-registered'
}
const statusMap: { [key: string]: number } = {
    'movie-note-not-found': 404
}
export const fromCode = (code: string) => {
    if (!dbErrorCodeMap[code]) {
        return new MovieNoteError('backend-error')
    }
    return new MovieNoteError(dbErrorCodeMap[code])
}
export class MovieNoteError extends Error {
    status?: number
    constructor(e?: ErrorKey, status?: number) {
        super(e);
        this.name = new.target.name;
        this.status = status || (e && statusMap[e]) || 400
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}