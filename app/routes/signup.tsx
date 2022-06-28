
import type { ActionFunction, ErrorBoundaryComponent, LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '@utils/auth/auth.server'
import { useCatch } from "@remix-run/react";
import { signup, initEmailAuthenticator, saveSession } from "~/features/auth/utils/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "@utils/db/server/auth.server";
import SignUp from '~/features/auth/components/sign-up'
import Layout from '~/features/auth/components/Layout'

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await authenticator.isAuthenticated(request)
  if (!user) {
    return json({});
  }
  const supabaseAdmin = getSupabaseAdmin(context)
  if( await hasAuth(supabaseAdmin, user.id) ) {
    return redirect('/app')
  }
  
  return redirect('/register')
};

export const action: ActionFunction = async ({ request, context }) => {
  const adminDb = getSupabaseAdmin(context)
  const auth = initEmailAuthenticator(adminDb)
  const user = await signup(auth, request)
  const cookie = await saveSession(user, auth, request)
  const redirextOption = {
    headers: { "Set-Cookie": cookie },
  }
  return redirect('/register', redirextOption)
}


export const SignupPage: React.FC = () => {
  return (
    <Layout>
      <SignUp />
    </Layout>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Layout>
      <SignUp errorKey={error.message}/>
    </Layout>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch();
  return (
    <Layout>
      <SignUp errorKey={caught.data}/>
    </Layout>
  )
}


export default SignupPage