import { Authenticator } from "remix-auth";
import * as sessionStorage from "@utils/auth/session";

export type AuthUserType = {
    provider: string,
    id: string,
    displayName: string,
    name: { familyName: string, givenName: string },
    emails: { value: string }[],
    photos: { value: string }[],
}

const authenticator = new Authenticator<AuthUserType>(sessionStorage)
export default authenticator