import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import authenticator from '@utils/auth/auth.server'
import { getSupabaseAdmin, userDb } from '@utils/db/server/index.server'
import { Form, useActionData } from "@remix-run/react";

interface ActionData {
    error?: string
  }

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request)
    if (user) {
        return json({})
    }
    return redirect('/login')
}

export const action: ActionFunction = async ({ request, context }) => {
    const formData = await request.formData()
    const adminDb = getSupabaseAdmin(context)
    const name = formData.get("name") as string || ''
    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    try {
        await userDb.registerUser(adminDb, user?.id, name)
        return redirect('/app')
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        },{ status: 400 })
    }
};

export default function Index() {
    const actionData = useActionData() as ActionData
    return (
        <>
            {actionData?.error && (
                <p className="text-red-500">{actionData?.error}</p>
            )}
            <Form method='post' style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }} noValidate>
                <h1 className="text-2xl">Register</h1>
                <label htmlFor="name">Name</label>
                <input id='name' name="name" />
                <button type='submit'>SUBMIT</button>
            </Form>
        </>
    );
}
