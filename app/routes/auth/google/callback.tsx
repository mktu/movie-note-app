import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import { authenticate, saveSession, getAuthenticatorFromContext } from '@utils/auth/google'
import { getSupabaseAdmin, authDb } from '@utils/db/server/index.server'

export let loader: LoaderFunction = async ({ request, context }) => {
  const auth = getAuthenticatorFromContext(context)
  const user = await authenticate(auth, request)

  if(!user){
    return redirect('/login')
  }

  const dbAdmin = getSupabaseAdmin(context)
  const hasAuthRegistered = await authDb.hasAuth(dbAdmin, user.id)

  const cookie = await saveSession(user, auth, request)
  const redirextOption = {
    headers: { "Set-Cookie": cookie },
  }

  if(!hasAuthRegistered){
    return redirect('/register', redirextOption)
  }
  return redirect('/app', redirextOption)
}