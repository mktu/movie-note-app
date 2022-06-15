
import { Form, Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '@utils/auth/auth.server'
import { login, initEmailAuthenticator, saveSession } from "~/features/auth/utils/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "@utils/db/server/auth.server";

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
  const { t } = useTranslation('common')
  return (
    <>
      <Form action="/auth/google" method="post">
        <button>{t('login-with-google')}</button>
      </Form>
      <Form method="post">
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' />
        <button id='login' name='login'>{t('login')}</button>
      </Form>
      <Link to='/signup'>Signup</Link>
    </>
  )
}

export default LoginPage