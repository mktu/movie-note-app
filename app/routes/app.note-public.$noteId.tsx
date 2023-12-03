import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralError } from '~/components/error';
import { MovieNotePreview } from '~/features/public-note/pages';
import { action } from '~/features/public-note/server/actions/public-note.server';
import { loader } from '~/features/public-note/server/loaders/public-note.server';
import { useNavigatorContext } from '~/providers/navigator/Context';

import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { AddPublicNote } from "~/features/public-note/server/validation/addPublicNote";
import type { FC } from 'react';
import { useSuccessMessage } from '~/hooks/useToast';
export {
    loader,
    action
}

const NotePreview: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
    const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    const onSubmit = useCallback((updateMovieNote: AddPublicNote) => {
        submit(getFormData(updateMovieNote), { method: 'post' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { t } = useTranslation('common')
    useSuccessMessage(t('update-succeeded'), !!(actionData?.success) && !!loaderData.content?.isUpdate)
    useSuccessMessage(t('publish-succeeded'), !!(actionData?.success) && !(loaderData.content?.isUpdate))
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content?.tmdbDetail.id && (
                <MovieNotePreview
                    key={loaderData.content.isUpdate ? 'update' : 'publish'}
                    init={loaderData.content.publicNote || undefined}
                    isUpdate={loaderData.content.isUpdate}
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
                />
            )}

        </>

    )
}

export default NotePreview