import type { LoaderFunction } from '@remix-run/cloudflare'
import { authenticate } from '@utils/auth/googleStrategy.server'

export let loader: LoaderFunction = ({ request, context }) => {
  return authenticate(context, request, {
    successRedirect: '/app',
    failureRedirect: '/login',
  })
}