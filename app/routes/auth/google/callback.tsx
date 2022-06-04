import type { LoaderFunction } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'
import { authenticate, saveSession, getAuthenticatorFromContext } from '@utils/auth/googleStrategy.server'

export let loader: LoaderFunction = async ({ request, context }) => {
  const auth = getAuthenticatorFromContext(context)
  const user = await authenticate(auth, request)
  if(!user){
    return redirect('/login')
  }

  const cookie = await saveSession(user, auth, request)
  
  return redirect('/app', {
    headers: { "Set-Cookie": cookie },
  })
  // return authenticate(context, request, {
  //   successRedirect: '/app',
  //   failureRedirect: '/login',
  // })
}