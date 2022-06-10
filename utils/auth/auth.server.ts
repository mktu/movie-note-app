import { Authenticator } from "remix-auth";
import * as sessionStorage from "@utils/auth/session";

export type AuthUserType = {
    provider: string,
    id: string,
    name: string,
    email: string,
    photos: { value: string }[],
} | {
    provider: string,
    id: string,
    email : string,
    password :string
}

const authenticator = new Authenticator<AuthUserType>(sessionStorage)

export default authenticator