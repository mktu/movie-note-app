import { useCallback, type FC } from "react";
import { GeneralError } from '~/components/error';
import { loader } from '~/features/movie-note/server/loaders/preview.server';
import { action } from '~/features/movie-note/server/actions/preview.server';
import { MovieNotePreview } from "~/features/movie-note/pages";
import { useLoaderData, useSubmit } from "@remix-run/react";
import type { PublishNote } from "~/features/movie-note/server/validation/parsePublish";
import { getFormData } from "@utils/form";
import { useNavigatorContext } from "~/providers/navigator/Context";
import { useTranslation } from "react-i18next";

export {
    loader,
    action
}

const NotePreview: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
    // const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    const onSubmit = useCallback((updateMovieNote: PublishNote) => {
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
                    isUpdate={loaderData.content.isUpdate}
                    tmdbDetail={loaderData.content?.tmdbDetail}
                    onPublish={(html) => {
                        onSubmit({
                            tmdbId: loaderData.content!.tmdbDetail.id,
                            html,
                            published: 'true'
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