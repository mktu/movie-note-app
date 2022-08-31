import { createCookieSessionStorage } from "@remix-run/cloudflare";
import type { SessionStorage } from "@remix-run/cloudflare";

export const getExpires = () => {
  return new Date(Date.now() + 600_000)
}

let storage: SessionStorage | null = null

export const initSessionStorage = (context: any) => {
  if (!context.COOKIE_SECRETS) {
    throw Error('COOKIE_SECRETS is not defined')
  }
  if (storage) {
    return
  }
  storage = createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__movie-note-app-session",

      // all of these are optional
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
      secrets: [context.COOKIE_SECRETS],
      secure: process.env.NODE_ENV === 'production',
    },
  });
}

const commitSession: SessionStorage['commitSession'] = async (arg) => {
  if (!storage) {
    throw Error('storage not init')
  }
  return await storage.commitSession(arg)
}

const getSession: SessionStorage['getSession'] =
  async (arg) => {
    if (!storage) {
      throw Error('storage not init')
    }
    return await storage.getSession(arg)
  }

const destroySession: SessionStorage['destroySession'] = async (arg) => {
  if (!storage) {
    throw Error('storage not init')
  }
  return await storage.destroySession(arg)
}

export { destroySession, commitSession, getSession };