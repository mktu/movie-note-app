import { redirect } from '@remix-run/cloudflare'
import type { ActionFunction, LoaderFunction } from '@remix-run/cloudflare'
import { authenticate, initGoogleAuthenticator } from '~/features/auth/server/google'
import { initServerContext } from '~/features/auth/server/init.server'

export let loader: LoaderFunction = () => redirect('/login')

export let action: ActionFunction = ({ request, context }) => {
  const { authenticator } = initServerContext(context)
  const auth = initGoogleAuthenticator(context, authenticator)
  return authenticate(auth, request)
}