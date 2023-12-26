import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { getFormData } from "@utils/form";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { GeneralError } from "~/components/error";
import { EditNoteTemplate } from "~/features/note-template";
import { action } from '~/features/note-template/server/actions/edit-template.server';
import { loader } from '~/features/note-template/server/loader/edit-template.server';
import { useSuccessCreateMessage, useSuccessUpdateMessage } from "~/hooks/useToast";

export {
    action,
    loader
}


const EditNoteTemplate_: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    const { t } = useTranslation('common')
    useSuccessUpdateMessage(t('update-succeeded'), !!(actionData?.success), loaderData.content?.updated_at || null)
    useSuccessCreateMessage(t('add-template'), !!(loaderData?.isNew))
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content &&
                (
                    <EditNoteTemplate key={loaderData.content.id} noteTemplate={loaderData.content} error={actionData?.error} onSubmit={(template) => {
                        submit(getFormData(template), { method: 'post' })
                    }} />
                )
            }

        </>

    )
}

export default EditNoteTemplate_