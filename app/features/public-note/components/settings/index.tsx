import type { FC } from "react"
import { useTranslation } from "react-i18next"
import { TextArea } from "~/components/inputs"
import InfoIcon from "~/components/icons/Info"
import { useNotePreviewContext } from "../../context/public-note/Context"
import { useNavigatorContext } from "~/providers/navigator/Context"
import Switch from "~/components/switch/Switch"

type Props = {

}

const Settings: FC<Props> = () => {
    const { t } = useTranslation()
    const { setSummary, summary, viewId, isPublic, setIsPublic, html } = useNotePreviewContext()
    const { navigator: Navigator } = useNavigatorContext()
    const publicLink = `/note-public/${viewId}`
    const isEmpty = !html
    return (
        <div className="p-4">
            <div className='flex flex-col gap-2 px-4'>
                <div className="flex items-center gap-2">
                    <Switch colorType='info'
                        label={isPublic ? t('published-note') : t('unpublished-note')}
                        enabled={isPublic}
                        disabled={isEmpty}
                        setEnabled={async (checked) => {
                            setIsPublic(checked)
                        }} />
                    {isEmpty && <div className="text-sm text-destructive-main">{t('empty-note-cannot-published')}</div>}

                </div>

                <p className="mb-2 flex items-center gap-2 text-sm text-text-main">
                    <InfoIcon className='h-4 w-4 fill-text-label' />
                    <span>{t('publish-note-information')}</span>
                </p>
                <label htmlFor='preview-summary'>{t('summary')}</label>
                <TextArea id='preview-summary' className='text-text-main' minRows={2} value={summary} onChange={(e) => {
                    setSummary(e.target.value)
                }} />
                <div>
                    公開リンク: TBD
                </div>
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