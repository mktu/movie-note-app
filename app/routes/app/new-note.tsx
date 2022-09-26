import type { FC } from "react";
import { NewMovieNote } from '~/features/movie-note/';

import { useActionData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import { action } from "~/features/movie-note/server/actions/new-note.server";

export { action }

const NewNote: FC = () => {
    const submit = useSubmit()
    const actionData = useActionData<typeof action>()

    return (<NewMovieNote onSubmit={(addMovieNote) => {
        submit(getFormData(addMovieNote), { method: 'post' })
    }} error={actionData?.error} />)
}

export default NewNote