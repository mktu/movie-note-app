import { redirect } from '@remix-run/cloudflare'
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare'
import { authenticate, getAuthenticatorFromContext } from '@utils/auth/googleStrategy.server'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request, context }) => {
  const auth = getAuthenticatorFromContext(context)
  return authenticate(auth, request)
}