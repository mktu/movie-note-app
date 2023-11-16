import { useActionData, useSubmit } from "@remix-run/react";
import { getFormData } from "@utils/form";
import { type FC } from "react";
import { NewNoteTemplate } from "~/features/note-template";
import { action } from '~/features/note-template/server/actions/new-template.server';

export {
    action
}


const NewNoteTemplate_: FC = () => {
    // const loaderData = useLoaderData<typeof loader>()
    // const { useNavigator } = useNavigatorContext()
    // const { navigate } = useNavigator()
    // const { i18n } = useTranslation()
    const actionData = useActionData<typeof action>()
    const submit = useSubmit()
    return (
        <>
            {/* {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )} */}
            <NewNoteTemplate error={actionData?.error} onSubmit={(template) => {
                submit(getFormData(template), { method: 'post' })
            }} />

        </>

    )
}

export default NewNoteTemplate_