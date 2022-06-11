export class NotFound extends Error {
    status: number
    constructor(status: number, e?: string) {
        super(e);
        this.name = new.target.name;
        this.status = status
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}