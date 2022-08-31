
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server'
import { login, initEmailAuthenticator, saveSession } from "~/features/auth/server/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "~/features/auth/server/db";
import Login from '~/features/auth/components/login'
import Layout from '~/features/auth/components/Layout'

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return json({})
  }
  const supabaseAdmin = getSupabaseAdmin(context)
  if (await hasAuth(supabaseAdmin, user.id)) {
    return redirect('/app')
  }

  return redirect('/register')
};

export const LoginPage: React.FC = () => {
  return (
    <div>Check your email</div>
  )
}

export default LoginPage