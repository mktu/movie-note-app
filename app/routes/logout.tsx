import { redirect } from "@remix-run/cloudflare"
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare"
import authenticator from "~/features/auth/server/auth.server"

export let loader: LoaderFunction = () => redirect('/login')

export const action: ActionFunction = async ({ request }) => {
    return authenticator.logout(request, {
        redirectTo: '/login'
    })
}
