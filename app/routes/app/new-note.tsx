import type { FC } from "react";
import { NewMovieNote } from '~/features/movie-note/';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import { action } from "~/features/movie-note/server/actions/new-note.server";
import { loader } from "~/features/movie-note/server/loaders/new-note.server";

export { action, loader }

const NewNote: FC = () => {
    const submit = useSubmit()
    const actionData = useActionData<typeof action>()
    const loaderData = useLoaderData<typeof loader>() || {}

    return (<NewMovieNote
        onSubmit={(addMovieNote) => {
            submit(getFormData(addMovieNote), { method: 'post' })
        }}
        error={actionData?.error}
        tmdbDetail={loaderData.content?.tmdbDetail}
        tmdbCredits={loaderData.content?.tmdbCredits}
    />)
}

export default NewNote