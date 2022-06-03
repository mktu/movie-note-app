
import { Form } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { isAuthenticated } from '@utils/auth/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await isAuthenticated(context, request)
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