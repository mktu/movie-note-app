export class ScrapeError extends Error {
    code: number
    constructor(message: string, code: number) {
        super(message);
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = new.target.name;
        this.code = code
        Object.setPrototypeOf(this, new.target.prototype)
    }
}