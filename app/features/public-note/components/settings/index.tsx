import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { TextArea } from "~/components/inputs"
import InfoIcon from "~/components/icons/Info"
import { useNotePreviewContext } from "../../context/public-note/Context"
import { useNavigatorContext } from "~/providers/navigator/Context"

type Props = {

}

const Settings: FC<Props> = () => {
    const { t } = useTranslation()
    const { setSummary, summary, viewId } = useNotePreviewContext()
    const { navigator: Navigator } = useNavigatorContext()
    const publicLink = `/note-public/${viewId}`

    return (
        <div className="p-4">
            <div className='flex flex-col gap-2 px-4'>
                <label htmlFor='preview-summary'>{t('summary')}</label>
                <TextArea id='preview-summary' className='text-text-main' minRows={2} value={summary} onChange={(e) => {
                    setSummary(e.target.value)
                }} />
                <p className='flex items-center gap-2 text-sm text-text-main'>
                    <InfoIcon className='h-4 w-4 fill-text-label' />
                    <span> {t('summary-description')}</span>
                </p>
                {viewId && (
                    <div className='mt-2 flex items-center gap-2'>
                        <span>👉</span>
                        <Navigator to={publicLink} className='text-sm'>{t('public-page')}</Navigator>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Settings