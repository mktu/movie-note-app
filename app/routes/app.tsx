import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { isAuthenticated, getAuthenticatorFromContext } from '@utils/auth/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
    const auth = getAuthenticatorFromContext(context)
  const user = await isAuthenticated(auth, request)
  if(user){
    return json({})
  }
  return redirect('/login')
};


export const App: React.FC = () => {
    return (
      <Outlet />
    )
  }
  
  export default App