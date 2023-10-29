import { type FC } from "react";
import { NewNoteTemplate } from "~/features/note-template";


const NewNoteTemplate_: FC = () => {
    // const loaderData = useLoaderData<typeof loader>()
    // const { useNavigator } = useNavigatorContext()
    // const { navigate } = useNavigator()
    // const { i18n } = useTranslation()
    // const actionData = useActionData<typeof action>()
    return (
        <>
            {/* {loaderData.error && (
                <GeneralError key={loaderData.error} />
            )} */}
            <NewNoteTemplate />

        </>

    )
}

export default NewNoteTemplate_