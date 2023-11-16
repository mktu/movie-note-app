export type ErrorKey =
    'template-not-found' |
    'backend-error' |
    'template-id-not-found'


const statusMap: { [key: string]: number } = {
    'template-not-found': 404
}

export class NoteTemplateError extends Error {
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