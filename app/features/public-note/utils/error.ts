export type ErrorKey =
    'public-note-already-registered' |
    'public-note-not-found' |
    'public-note-id-not-found' |
    'invalid-public-note' |
    'backend-error' |
    'lng-not-found'

export class PublicNoteError extends Error {
    status?: number
    constructor(e?: ErrorKey, status?: number) {
        super(e);
        this.name = new.target.name;
        this.status = status || 400
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export const throwPublicNoteError = (code: string, key?: ErrorKey) => {
    const codeNum = Number(code)
    if (codeNum) {
        throw new PublicNoteError(key || 'backend-error', codeNum)
    }
    throw new PublicNoteError(key || 'backend-error', 500)
}