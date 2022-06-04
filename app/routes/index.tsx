import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { isAuthenticated, getAuthenticatorFromContext } from '@utils/auth/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
  const auth = getAuthenticatorFromContext(context)
  const user = await isAuthenticated(auth, request)
  if(user){
    return redirect('/app')
  }
  return redirect('/login')
}