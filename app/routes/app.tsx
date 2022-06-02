import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect, json } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import { isAuthenticated } from '@utils/googleStrategy.server'

export const loader: LoaderFunction = async ({ request, context }) => {
  const user = await isAuthenticated(context, request)
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