import { useCallback } from 'react';
import { GeneralError } from '~/components/error';
import { MovieNotePreview } from '~/features/public-note/pages';
import { action } from '~/features/public-note/server/actions/preview-note.server';
import { loader } from '~/features/public-note/server/loaders/preview-note.server';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { AddPublicNote } from "~/features/public-note/server/validation/addPublicNote";
import type { FC } from 'react';
import { useMovieNotePublishMessage } from '~/features/public-note/hooks/useMovieNotePreview';
import { convertPublicNote } from '~/features/public-note/utils/convertType';
export {
    loader,
    action
}

const NotePreview: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    const onSubmit = useCallback((updateMovieNote: AddPublicNote) => {
        submit(getFormData(updateMovieNote), { method: 'post' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useMovieNotePublishMessage()
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content?.tmdbDetail.id && (
                <MovieNotePreview
                    init={loaderData.content.publicNote ? convertPublicNote(loaderData.content.publicNote) : undefined}
                    isUpdate={!!loaderData.content.publicNote}
                    tmdbDetail={loaderData.content.tmdbDetail}
                    onPublish={onSubmit}
                    error={actionData?.error}
                />
            )}

        </>

    )
}

export default NotePreview