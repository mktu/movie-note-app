import { redirect } from '@remix-run/cloudflare'
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare'
import { authenticate, initGoogleAuthenticator } from '~/features/auth/server/google'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request, context }) => {
  const auth = initGoogleAuthenticator(context)
  return authenticate(auth, request)
}