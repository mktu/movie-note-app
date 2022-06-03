import { GoogleStrategy } from "remix-auth-google";
import type { GoogleProfile } from "remix-auth-google";

import authenticator from './auth.server'

let googleStrategy : GoogleStrategy<GoogleProfile> | null = null

const getAuthenticator = ({
  clientID,
  clientSecret,
  callbackURL
}: {
  clientID: string,
  clientSecret: string,
  callbackURL: string
}) => {

  if (googleStrategy) {
    return authenticator
  }
  googleStrategy = new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
      console.log('thisis profile')
      // Get the user data from your DB or API using the tokens and profile
      return profile
    }
  );
  authenticator.use(googleStrategy);
  return authenticator
}

const getAuthenticatorFromContext = (context : any) => {
    const {
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL
      } = context
    return getAuthenticator({
        clientID : GOOGLE_CLIENT_ID,
        clientSecret : GOOGLE_CLIENT_SECRET,
        callbackURL : GOOGLE_CALLBACK_URL
    })
}

const authenticate  = async (context : any, request : Parameters<typeof authenticator.authenticate>[1],
     options ?: Parameters<typeof authenticator.authenticate>[2])=>{
    const authenticator = getAuthenticatorFromContext(context)
    return await authenticator.authenticate('google', request, options)
}

const isAuthenticated = async (context : any, request : Parameters<typeof authenticator.isAuthenticated>[0]) => {
    const authenticator = getAuthenticatorFromContext(context)
    return await authenticator.isAuthenticated(request)
}



export {
    authenticate,
    isAuthenticated
} 