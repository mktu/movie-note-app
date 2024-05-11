
import type { LoaderFunction } from "@remix-run/cloudflare";
import { hasAuth } from '~/features/auth/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/supabaseAdmin.server';
import { initServerContext } from "~/features/auth/server/init.server";

export const loader: LoaderFunction = async ({ request, context }) => {
  const { authenticator } = initServerContext(context)
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