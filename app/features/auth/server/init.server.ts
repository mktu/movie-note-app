import type { AppLoadContext } from "@remix-run/cloudflare";
import { initSessionStorage, initSessionStorageInFunction } from "./session";
import { createAuthenticator } from "./auth.server";

export const initServerContext = (context: AppLoadContext) => {
    const sessionStorage = initSessionStorage(context)
    const authenticator = createAuthenticator(sessionStorage)
    return {
        sessionStorage,
        authenticator
    }
}

export const initFunctionContext = (env: Env) => {
    const sessionStorage = initSessionStorageInFunction(env)
    const authenticator = createAuthenticator(sessionStorage)
    return {
        sessionStorage,
        authenticator
    }
}