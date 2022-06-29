
import type { ActionFunction, LoaderFunction, ErrorBoundaryComponent } from "@remix-run/cloudflare";
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
  if(user.provider === 'email' && !user.confirmed){
    return json({})
  }
  const supabaseAdmin = getSupabaseAdmin(context)
  if (await hasAuth(supabaseAdmin, user.id)) {
    return redirect('/app')
  }

  return redirect('/register')
};

export const action: ActionFunction = async ({ request, context }) => {
  const adminDb = getSupabaseAdmin(context)
  const auth = initEmailAuthenticator(adminDb)
  const user = await login(auth, request)
  const cookie = await saveSession(user, auth, request)
  const redirextOption = {
    headers: { "Set-Cookie": cookie },
  }

  const supabaseAdmin = getSupabaseAdmin(context)
  if (await hasAuth(supabaseAdmin, user.id)) {
    return redirect('/app', redirextOption)
  }

  return redirect('/register', redirextOption)
}


export const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Layout>
      <Login errorKey={error.message}/>
    </Layout>
  )
}

export default LoginPage