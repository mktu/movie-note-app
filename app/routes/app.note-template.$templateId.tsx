import { useActionData, useLoaderData, useSubmit } from "@remix-run/react";
import { getFormData } from "@utils/form";
import { useEffect, type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { GeneralError } from "~/components/error";
import { EditNoteTemplate } from "~/features/note-template";
import { action } from '~/features/note-template/server/actions/edit-template.server';
import { loader } from '~/features/note-template/server/loader/edit-template.server';

export {
    action,
    loader
}


const EditNoteTemplate_: FC = () => {
    const loaderData = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    const { t } = useTranslation('common')
    const msg = t('update-succeeded')
    useEffect(() => {
        if (actionData?.success) {
            toast.success(msg)
        }
    }, [actionData?.success, msg])
    return (
        <>
            {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )}
            {loaderData.content &&
                (
                    <EditNoteTemplate noteTemplate={loaderData.content} error={actionData?.error} onSubmit={(template) => {
                        submit(getFormData(template), { method: 'post' })
                    }} />
                )
            }

        </>

    )
}

export default EditNoteTemplate_