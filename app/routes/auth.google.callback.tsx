import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import { authenticate, saveSession, initGoogleAuthenticator } from '~/features/auth/server/google'
import { getSupabaseAdmin } from '@utils/server/db'
import { hasAuth } from '~/features/auth/server/db'

export let loader: LoaderFunction = async ({ request, context }) => {
  const auth = initGoogleAuthenticator(context)
  const user = await authenticate(auth, request)

  if (!user) {
    return redirect('/login')
  }

  const dbAdmin = getSupabaseAdmin(context)
  const hasAuthRegistered = await hasAuth(dbAdmin, user.id)

  const cookie = await saveSession(user, auth, request)
  const redirextOption = {
    headers: { "Set-Cookie": cookie },
  }

  if (!hasAuthRegistered) {
    return redirect('/register', redirextOption)
  }
  return redirect('/app', redirextOption)
}