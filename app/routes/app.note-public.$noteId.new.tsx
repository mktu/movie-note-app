import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralError } from '~/components/error';
import { MovieNotePreview } from '~/features/public-note/pages';
import { action } from '~/features/public-note/server/actions/public-note.update.server';
import { loader } from '~/features/public-note/server/loaders/public-note.new.server';
import { useNavigatorContext } from '~/providers/navigator/Context';

import { useLoaderData, useSubmit } from '@remix-run/react';
import { getFormData } from '@utils/form';

import type { AddPublicNote } from "~/features/public-note/server/validation/addPublicNote";
import type { FC } from 'react';
export {
    loader,
    action
}

const NewPublicNote: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
    const submit = useSubmit()
    const onSubmit = useCallback((updateMovieNote: AddPublicNote) => {
        submit(getFormData(updateMovieNote), { method: 'post' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content?.tmdbDetail.id && (
                <MovieNotePreview
                    isUpdate={false}
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

export default NewPublicNote