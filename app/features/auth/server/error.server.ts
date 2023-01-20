import { ServerError } from "@utils/server/error";

type ErrorKey =
    'email-not-confirmed' |
    'user-not-found' |
    'user-already-registered' |
    'invalid-email-or-pass'
export class AuthError extends ServerError {
    constructor(e?: ErrorKey, code?: number) {
        super(e as string, code);
    }
}