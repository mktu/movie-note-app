import type { SessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";

export type AuthUserType = {
    provider: 'google',
    id: string,
    name: string,
    email: string,
    photos: { value: string }[],
} | {
    provider: 'email',
    id: string,
    email: string,
}
export const createAuthenticator = (sessionStorage: SessionStorage) => {
    return new Authenticator<AuthUserType>(sessionStorage)
}

export type AuthenticatorType = Authenticator<AuthUserType>