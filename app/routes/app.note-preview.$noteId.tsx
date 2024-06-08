import { useCallback } from 'react';
import { GeneralError } from '~/components/error';
import { MovieNotePreview } from '~/features/public-note/pages';
import { action } from '~/features/public-note/server/actions/preview-note.server';
import { loader } from '~/features/public-note/server/loaders/preview-note.server';

import { useActionData, useFetcher, useLoaderData } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { FC } from 'react';
import { convertPublicNote } from '~/features/public-note/utils/convertType';
import type { AddPublicNote } from '@type-defs/frontend';
export {
    loader,
    action
}

const NotePreview: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const onSubmit = useCallback((updateMovieNote: AddPublicNote) => {
        submit(getFormData(updateMovieNote), {
            method: 'post', encType: 'multipart/form-data',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { state, submit } = useFetcher()
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content?.tmdbDetail.id && (
                <MovieNotePreview
                    state={state}
                    init={loaderData.content.publicNote ? convertPublicNote(loaderData.content.publicNote) : undefined}
                    tmdbDetail={loaderData.content.tmdbDetail}
                    onPublish={onSubmit}
                    error={actionData?.error}
                />
            )}

        </>

    )
}

export default NotePreview