import { Authenticator } from "remix-auth";
import * as sessionStorage from "@utils/auth/session";

export type AuthUserType = {
    provider: 'google',
    id: string,
    name: string,
    email: string,
    photos: { value: string }[],
} | {
    provider: 'email',
    id: string,
    email : string,
}

const authenticator = new Authenticator<AuthUserType>(sessionStorage)

export default authenticator