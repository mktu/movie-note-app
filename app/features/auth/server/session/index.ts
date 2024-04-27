import { createCookieSessionStorage } from "@remix-run/cloudflare";
import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";

export const getExpires = () => {
  return new Date(Date.now() + 600_000)
}

export const initSessionStorage = (context: AppLoadContext) => {
  const { cloudflare: { env } } = context
  return initSessionStorageInFunction(env)
}

export const initSessionStorageInFunction = (env: Env) => {
  if (!env.COOKIE_SECRETS) {
    throw Error('COOKIE_SECRETS is not defined')
  }
  const storage = createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__movie-note-app-session",

      // all of these are optional
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
      secrets: [env.COOKIE_SECRETS],
      secure: process.env.NODE_ENV === 'production',
    },
  });

  const commitSession: SessionStorage['commitSession'] = async (arg) => {
    if (!storage) {
      throw Error('storage not init(commitSession)')
    }
    return await storage.commitSession(arg)
  }

  const getSession: SessionStorage['getSession'] =
    async (arg) => {
      if (!storage) {
        throw Error('storage not init(getSession)')
      }
      return await storage.getSession(arg)
    }

  const destroySession: SessionStorage['destroySession'] = async (arg) => {
    if (!storage) {
      throw Error('storage not init(destroySession)')
    }
    return await storage.destroySession(arg)
  }

  return { destroySession, commitSession, getSession };
}