import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { initServerContext } from "~/features/auth/server/init.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const { authenticator } = initServerContext(context)
  const user = await authenticator.isAuthenticated(request)
  if (user) {
    return redirect('/app')
  }
  return redirect('/login')
}