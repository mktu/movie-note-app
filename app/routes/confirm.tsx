
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '@utils/auth/auth.server'
import { login, initEmailAuthenticator, saveSession } from "~/features/auth/utils/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "@utils/db/server/auth.server";
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