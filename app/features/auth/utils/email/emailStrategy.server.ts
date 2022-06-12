import { getSession, commitSession } from '@utils/auth/session'
import type { AdminClientType } from "@utils/supabaseAdmin.server"
import SignupStrategy from './signup.server'
import SigninStrategy from './signin.server'

import __authenticator from '@utils/auth/auth.server'
import { NotFound } from '@utils/exceptions'

type AuthenticatorType = typeof __authenticator

let signupStrategy: SignupStrategy | null = null
let signinStrategy: SigninStrategy | null = null


const initEmailAuthenticator = (supabaseAdmin: AdminClientType) => {

    if(!signupStrategy){
        signupStrategy = new SignupStrategy(
            async ({ email, password }) => {
                const { user, error } = await supabaseAdmin.auth.signUp({ email, password })
                if(error){
                    console.error(error)
                    throw Error('Something happened in signin process')
                }
                if(!user){
                    throw new NotFound(404, 'failed to signup')
                }
                return {
                    password,
                    email,
                    id : user.id,
                    provider : 'email'
                }
            }
        );
        __authenticator.use(signupStrategy);
    }
    if(!signinStrategy){
        signinStrategy = new SigninStrategy(
            async ({ email, password }) => {
                const { user, error } = await supabaseAdmin.auth.signIn({ email, password })
                if(error){
                    console.error(error)
                    throw Error('Something happened in signin process')
                }
                if(!user){
                    throw new NotFound(404, 'failed to signin')
                }
                return {
                    password,
                    email,
                    id : user.id,
                    provider : 'email'
                    
                }
            }
        );
        __authenticator.use(signinStrategy);
    }
    return __authenticator
}

const signup = async (authenticator: AuthenticatorType, request: Parameters<typeof authenticator.authenticate>[1],
    options?: Parameters<typeof authenticator.authenticate>[2]) => {
    return await authenticator.authenticate('email-signup', request, options)
}

const login = async (authenticator: AuthenticatorType, request: Parameters<typeof authenticator.authenticate>[1],
    options?: Parameters<typeof authenticator.authenticate>[2]) => {
    return await authenticator.authenticate('email-signin', request, options)
}

const saveSession = async (user: any, authenticator: AuthenticatorType, request: Parameters<typeof authenticator.isAuthenticated>[0]) => {
    let session = await getSession(request.headers.get("Cookie"));
    // if we do have a successRedirect, we redirect to it and set the user
    // in the session sessionKey
    session.set(authenticator.sessionKey, user);
    session.set(authenticator.sessionStrategyKey || "strategy", signinStrategy?.name);
    return await commitSession(session)
}

export {
    login,
    signup,
    saveSession,
    initEmailAuthenticator
} 