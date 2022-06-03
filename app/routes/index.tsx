import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { isAuthenticated } from '@utils/auth/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await isAuthenticated(context, request)
  if(user){
    return redirect('/app')
  }
  return redirect('/login')
}