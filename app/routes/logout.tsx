import { redirect } from "@remix-run/cloudflare"
import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare"
import { initServerContext } from "~/features/auth/server/init.server"

export let loader: LoaderFunction = () => redirect('/login')

export const action: ActionFunction = async ({ request, context }) => {
    const { authenticator } = initServerContext(context)
    return authenticator.logout(request, {
        redirectTo: '/login'
    })
}
