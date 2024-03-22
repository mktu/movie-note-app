
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '~/features/auth/server/auth.server'
import { login, initEmailAuthenticator, saveSession } from "~/features/auth/server/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "~/features/auth/server/db";
import Login from '~/features/auth/components/login'
import Layout from '~/features/auth/components/Layout'
import type { FC } from "react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

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

export const ErrorBoundary: FC = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <Layout>
        <Login errorKey={error.data.message} />
      </Layout>
    )
  } else if (error instanceof Error) {
    return (
      <Layout>
        <Login errorKey={error.message} />
      </Layout>
    )
  }
  return (
    null
  )
}

export default LoginPage