import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import { authenticate, initGoogleAuthenticator, saveGoogleSession } from '~/features/auth/server/google'
import { getSupabaseAdmin } from '@utils/server/db'
import { hasAuth } from '~/features/auth/server/db'
import { initServerContext } from '~/features/auth/server/init.server'

export let loader: LoaderFunction = async ({ request, context }) => {
  const { authenticator, sessionStorage } = initServerContext(context)
  const auth = initGoogleAuthenticator(context, authenticator)
  const user = await authenticate(auth, request)

  if (!user) {
    return redirect('/login')
  }

  const dbAdmin = getSupabaseAdmin(context)
  const hasAuthRegistered = await hasAuth(dbAdmin, user.id)

  const cookie = await saveGoogleSession(user, auth, request, sessionStorage)
  const redirextOption = {
    headers: { "Set-Cookie": cookie },
  }

  if (!hasAuthRegistered) {
    return redirect('/register', redirextOption)
  }
  return redirect('/app', redirextOption)
}