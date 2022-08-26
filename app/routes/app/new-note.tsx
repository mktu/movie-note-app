import { json, redirect } from "@remix-run/cloudflare";
import type { ActionArgs } from "@remix-run/cloudflare";
import authenticator from "@utils/auth/auth.server";
import { getSupabaseAdmin } from '@utils/db/server/index.server'
import type { FC } from "react";
import { MovieNote } from "~/features/movie-note/";
import { registerMovieNote } from "~/features/movie-note/utils/db.server";
import { useActionData, useSubmit } from "@remix-run/react";
import { MovieNoteError } from "~/features/movie-note/utils/error";

type ActionData = {
    error?: string
}

export async function action({ request, context }: ActionArgs) {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }

    const formData = await request.formData()
    const supabaseAdmin = getSupabaseAdmin(context)
    const tmdbId = formData.get("tmdbId") as string || ''
    const movieMemo = formData.get("movieMemo") as string || ''

    try {
        await registerMovieNote(supabaseAdmin, {
            tmdbId,
            movieMemo,
            userId: user.id,
        })
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

    return (<MovieNote onSubmit={(addMovieNote) => {
        const formData = new FormData()
        formData.set("tmdbId", addMovieNote.tmdbId || '')
        formData.set("movieMemo", addMovieNote.movieMemo || '')
        submit(formData, { method: 'post' })
    }} error={actionData?.error} />)
}

export default NewNote