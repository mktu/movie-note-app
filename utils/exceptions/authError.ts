type ErrorKey = 
'email-not-confirmed' | 
'user-not-found' | 
'user-already-registered' |
'invalid-email-or-pass'
export class AuthError extends Error {
    code ?:number
    constructor(e?: ErrorKey, code?:number) {
        super(e);
        this.name = new.target.name;
        this.code = code
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}