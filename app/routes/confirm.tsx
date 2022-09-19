
import type { LoaderFunction } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server';
import { hasAuth } from '~/features/auth/server/db';

import { json, redirect } from '@remix-run/cloudflare';
import { getSupabaseAdmin } from '@utils/supabaseAdmin.server';

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