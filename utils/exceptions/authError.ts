type ErrorType = 'not-confirmed' | 'not-found' | 'already-registered'
export class AuthError extends Error {
    status: ErrorType
    code ?:number
    constructor(status: ErrorType, e?: string, code?:number) {
        super(e);
        this.name = new.target.name;
        this.status = status
        this.code = code
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}