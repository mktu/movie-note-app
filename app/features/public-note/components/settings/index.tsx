import { useEffect, type FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { TextArea } from "~/components/inputs"
import InfoIcon from "~/components/icons/Info"
import { useNotePreviewContext } from "../../context/public-note/Context"
import Switch from "~/components/switch/Switch"
import CopyLink from "./CopyLink"
import CoverImage from "./CoverImage"



function replaceUrl(oldUrl: string, newPath: string): string {
    // Parses URLs into protocol, host, port, path, and query
    const urlParts = oldUrl.match(/^(.*?:\/\/)?([^:/]+)(:\d+)?(\/.*?)?(\?.*)?$/) || [];

    // replace path
    const newUrl = `${urlParts[1] || 'http://'}${urlParts[2] || ''}${urlParts[3] || ''}${newPath}`;

    return newUrl;
}

const Settings: FC = () => {
    const { t } = useTranslation()
    const [publicLink, setPublicLink] = useState('')
    const {
        setSummary,
        summary,
        viewId,
        isPublic,
        setIsPublic,
        html,
        tmdbImageUrl,
        coverImage,
        imgError,
        onChangeCoverImage,
        onSelectDefaultImage
    } = useNotePreviewContext()
    const isEmpty = !html
    useEffect(() => {
        const currentUrl = window.location.href;
        if (viewId) {
            setPublicLink(replaceUrl(currentUrl, `/note-public/${viewId}`))
        }
    }, [viewId])
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
                    <InfoIcon className='size-8 fill-text-label md:size-4' />
                    <span>{t('publish-note-information')}</span>
                </p>
                <CoverImage
                    image={coverImage}
                    defaultImage={tmdbImageUrl}
                    imgError={imgError}
                    onChangeImage={onChangeCoverImage}
                    onClickDefaultImage={onSelectDefaultImage} />

                <label htmlFor='preview-summary'>{t('summary')}</label>
                <TextArea id='preview-summary' className='text-text-main' minRows={2} value={summary || ''} onChange={(e) => {
                    setSummary(e.target.value)
                }} />
                {viewId && isPublic && (
                    <div>
                        <CopyLink url={publicLink} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Settings