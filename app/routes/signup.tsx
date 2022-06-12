
import { Form } from "@remix-run/react";
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import authenticator from '@utils/auth/auth.server'
import { signup, initEmailAuthenticator, saveSession } from "~/features/auth/utils/email";
import { getSupabaseAdmin } from "@utils/supabaseAdmin.server";
import { hasAuth } from "@utils/db/server/auth.server";

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
    <>
      <Form method="post">
        <label htmlFor='email'>Email</label>
        <input id='email' name='email'/>
        <label htmlFor='password'>Password</label>
        <input id='password' name='password'/>
        <button>Submit</button>
      </Form>
    </>
  )
}

export default SignupPage