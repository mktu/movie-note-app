import { json, redirect } from "@remix-run/cloudflare";
import type { ActionFunction } from "@remix-run/cloudflare";
import authenticator from "@utils/auth/auth.server";
import { getSupabaseAdmin, movieNoteDb } from '@utils/db/server/index.server'
import type { FC } from "react";
import { MovieNote } from "~/features/movie-note/";
import { useSubmit } from "@remix-run/react";

type ActionData = {
    error?: string
}

export const action: ActionFunction = async ({ request, context }) => {

    const user = await authenticator.isAuthenticated(request)

    if (!user) {
        return redirect('/login')
    }

    const formData = await request.formData()
    const supabaseAdmin = getSupabaseAdmin(context)
    const tmdbId = formData.get("tmdbId") as string || ''
    const movieMemo = formData.get("movieMemo") as string || ''

    try {
        await movieNoteDb.registerMovieNote(supabaseAdmin, {
            tmdbId,
            movieMemo,
            userId: user.id,
        })
        return redirect('/app')
    } catch (e) {
        return json<ActionData>({
            error: (e as Error).message
        }, { status: 400 })
    }
};

const NewNote: FC = () => {
    const submit = useSubmit()

    return (<MovieNote onSubmit={(addMovieNote) => {
        const formData = new FormData()
        formData.set("tmdbId", addMovieNote.tmdbId || '')
        formData.set("movieMemo", addMovieNote.movieMemo || '')
        submit(formData, { method: 'post' })
    }} />)
}

export default NewNote