import { GoogleStrategy, GoogleStrategyDefaultName } from "remix-auth-google";
import { getExpires } from '~/features/auth/server/session'
import type { AuthUserType, AuthenticatorType } from '~/features/auth/server/auth.server'
import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";


const applyAuthenticator = ({
  clientID,
  clientSecret,
  callbackURL,
  authenticator
}: {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  authenticator: AuthenticatorType
}) => {

  const googleStrategy = new GoogleStrategy<AuthUserType>(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async ({ profile }) => {
      // Get the user data from your DB or API using the tokens and profile
      return {
        name: profile.displayName,
        email: profile.emails.length > 0 ? profile.emails[0].value : '',
        provider: 'google',
        id: profile.id,
        photos: profile.photos
      }
    }
  );
  authenticator.use(googleStrategy);
  return authenticator
}

const initGoogleAuthenticator = (context: AppLoadContext, authenticator: AuthenticatorType) => {

  const {
    cloudflare: {
      env: {
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        GOOGLE_CALLBACK_URL
      }
    }
  } = context
  return applyAuthenticator({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    authenticator
  })
}

const authenticate = async (authenticator: AuthenticatorType, request: Parameters<typeof authenticator.authenticate>[1],
  options?: Parameters<typeof authenticator.authenticate>[2]) => {
  return await authenticator.authenticate('google', request, options)
}

const saveGoogleSession = async (user: any, authenticator: AuthenticatorType, request: Request, sessionStorage: SessionStorage) => {
  let session = await sessionStorage.getSession(request.headers.get("Cookie"));
  // if we do have a successRedirect, we redirect to it and set the user
  // in the session sessionKey
  session.set(authenticator.sessionKey, user);
  session.set(authenticator.sessionStrategyKey || "strategy", GoogleStrategyDefaultName);
  return await sessionStorage.commitSession(session, {
    expires: getExpires(),
  })
}

export {
  authenticate,
  saveGoogleSession,
  initGoogleAuthenticator
} 