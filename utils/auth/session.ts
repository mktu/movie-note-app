import { createCookieSessionStorage } from "@remix-run/cloudflare";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: "__movie-note-app-session",

      // all of these are optional
      expires: new Date(Date.now() + 60_000),
      httpOnly: true,
      maxAge: 600,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === 'production',
    },
  });

export { getSession, commitSession, destroySession };