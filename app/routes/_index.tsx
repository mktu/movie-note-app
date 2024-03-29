import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request)
  if (user) {
    return redirect('/app')
  }
  return redirect('/login')
}