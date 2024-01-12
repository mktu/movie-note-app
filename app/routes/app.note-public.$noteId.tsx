import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralError } from '~/components/error';
import { MovieNotePreview } from '~/features/public-note/pages';
import { action } from '~/features/public-note/server/actions/preview-note.server';
import { loader } from '~/features/public-note/server/loaders/preview-note.server';
import { useNavigatorContext } from '~/providers/navigator/Context';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { AddPublicNote } from "~/features/public-note/server/validation/addPublicNote";
import type { FC } from 'react';
import { useMovieNotePublishMessage } from '~/features/public-note/hooks/useMovieNotePreview';
export {
    loader,
    action
}

const PublicNote: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
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
                    init={loaderData.content.publicNote}
                    isUpdate
                    tmdbDetail={loaderData.content?.tmdbDetail}
                    onPublish={(content) => {
                        onSubmit({
                            tmdbId: loaderData.content!.tmdbDetail.id,
                            ...content
                        })
                    }}
                    onBack={() => {
                        navigate(`/app/notes/${loaderData.content!.tmdbDetail.id}?lng=${i18n.language}`)
                    }}
                    error={actionData?.error}
                />
            )}

        </>

    )
}

export default PublicNote 