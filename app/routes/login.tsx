
import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { getAuthenticatorFromContext, isAuthenticated } from '@utils/auth/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
  const auth = getAuthenticatorFromContext(context)
  const user = await isAuthenticated(auth, request)
  if(user){
    return redirect('/app')
  }
  return json({});
};


export const LoginPage: React.FC = () => {
  return (
    <Form action="/auth/google" method="post">
      <button>Login with Google</button>
    </Form>
  )
}

export default LoginPage