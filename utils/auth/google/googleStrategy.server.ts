import { GoogleStrategy } from "remix-auth-google";
import { getSession, commitSession } from '@utils/auth/session'
import __authenticator from '../auth.server'
import type { AuthUserType } from '../auth.server'

let googleStrategy : GoogleStrategy<AuthUserType> | null = null
type AuthenticatorType = typeof __authenticator

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
    return __authenticator
  }
  googleStrategy = new GoogleStrategy<AuthUserType>(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async ({ profile }) => {
      // Get the user data from your DB or API using the tokens and profile
      return {
        name : profile.displayName,
        email : profile.emails.length > 0 ? profile.emails[0].value : '',
        provider : profile.provider,
        id: profile.id,
        photos: profile.photos
      } 
    }
  );
  __authenticator.use(googleStrategy);
  return __authenticator
}

const initGoogleAuthenticator = (context : any) => {
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

const authenticate  = async (authenticator : AuthenticatorType, request : Parameters<typeof authenticator.authenticate>[1],
     options ?: Parameters<typeof authenticator.authenticate>[2])=>{
    return await authenticator.authenticate('google', request, options)
}

const saveSession = async (user:any, authenticator : AuthenticatorType, request : Parameters<typeof authenticator.isAuthenticated>[0])=>{
  let session = await getSession(request.headers.get("Cookie"));
  // if we do have a successRedirect, we redirect to it and set the user
  // in the session sessionKey
  session.set(authenticator.sessionKey, user);
  session.set(authenticator.sessionStrategyKey || "strategy", googleStrategy?.name);
  return await commitSession(session)
}

export {
    authenticate,
    saveSession,
    initGoogleAuthenticator
} 