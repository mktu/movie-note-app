import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import authenticator from "~/features/auth/server/auth.server";
import { getSupabaseAdmin } from '@utils/server/db/index.server'
import type { FC } from "react";
import { NewMovieNote } from "~/features/movie-note/";
import { registerMovieNote } from "~/features/movie-note/server/db";
import { useActionData, useSubmit } from "@remix-run/react";
import { MovieNoteError } from "~/features/movie-note/utils/error";
import { getFormData } from "@utils/form";
import { parseAddNote } from "~/features/movie-note/server/validation";

type ActionData = {
    error?: string
}

export async function action({ request, context }: ActionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }
    const supabaseAdmin = getSupabaseAdmin(context)
    try {
        const data = parseAddNote(await request.formData())
        await registerMovieNote(supabaseAdmin, data, user.id)
        return redirect('/app')
    } catch (e) {
        if (e instanceof MovieNoteError) {
            return json<ActionData>({
                error: e.message
            }, { status: e.status })
        }
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};

const NewNote: FC = () => {
    const submit = useSubmit()
    const actionData = useActionData<typeof action>()

    return (<NewMovieNote onSubmit={(addMovieNote) => {
        submit(getFormData(addMovieNote), { method: 'post' })
    }} error={actionData?.error} />)
}

export default NewNote