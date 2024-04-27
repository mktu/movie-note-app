import type { AdminClientType } from "@utils/supabaseAdmin.server"
import SignupStrategy from './signup.server'
import SigninStrategy from './signin.server'

import type { AuthenticatorType } from '~/features/auth/server/auth.server';
import { AuthError } from '../error.server'
import type { SessionStorage } from '@remix-run/cloudflare'
import { getExpires } from "../session";

let signupStrategy: SignupStrategy | null = null
let signinStrategy: SigninStrategy | null = null


const applyEmailStorategy = (supabaseAdmin: AdminClientType, authenticator: AuthenticatorType) => {

    if (!signupStrategy) {
        signupStrategy = new SignupStrategy(
            async ({ email, password }) => {
                const { data }: any = await supabaseAdmin.rpc('is_user_exists', { target_email: email })
                const isExists = data as boolean
                if (isExists) {
                    throw new AuthError('user-already-registered', 400)
                }
                const { data: { user }, error } = await supabaseAdmin.auth.signUp({ email, password })

                if (error) {
                    console.error(error)
                    throw Error('invalid-email-or-pass')
                }
                if (!user) {
                    throw new AuthError('user-not-found', 404)
                }
                return {
                    email,
                    id: user.id,
                    provider: 'email',
                }
            }
        );
        authenticator.use(signupStrategy);
    }
    if (!signinStrategy) {
        signinStrategy = new SigninStrategy(
            async ({ email, password }) => {
                const { data: { user }, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })
                if (error) {
                    console.error(error)
                    // if (error.status === 404) {
                    //     throw new AuthError('user-not-found', 404)
                    // }
                    // if (error.status === 400 && error.message === 'Email not confirmed') {
                    //     throw new AuthError('email-not-confirmed', 400)
                    // }
                    throw new AuthError('invalid-email-or-pass', 400)
                }
                if (!user) {
                    throw new AuthError('user-not-found', 404)
                }
                return {
                    email,
                    id: user.id,
                    provider: 'email',
                }
            }
        );
        authenticator.use(signinStrategy);
    }
    return authenticator
}

const signup = async (authenticator: AuthenticatorType, request: Parameters<typeof authenticator.authenticate>[1],
    options?: Parameters<typeof authenticator.authenticate>[2]) => {
    return await authenticator.authenticate('email-signup', request, options)
}

const login = async (authenticator: AuthenticatorType, request: Parameters<typeof authenticator.authenticate>[1],
    options?: Parameters<typeof authenticator.authenticate>[2]) => {
    return await authenticator.authenticate('email-signin', request, options)
}

const saveSession = async (user: any, authenticator: AuthenticatorType, request: Request, sessionStorage: SessionStorage) => {
    let session = await sessionStorage.getSession(request.headers.get("Cookie"));
    // if we do have a successRedirect, we redirect to it and set the user
    // in the session sessionKey
    session.set(authenticator.sessionKey, user);
    session.set(authenticator.sessionStrategyKey || "strategy", signinStrategy?.name);
    return await sessionStorage.commitSession(session, {
        expires: getExpires(),
    })
}

export {
    login,
    signup,
    saveSession,
    applyEmailStorategy
} 