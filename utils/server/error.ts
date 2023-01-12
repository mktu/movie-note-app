export class ServerError extends Error {
    code?: number
    constructor(e?: string, code?: number) {
        super(e);
        this.name = new.target.name;
        this.code = code
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}