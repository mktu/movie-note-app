import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import { useNotePreviewContext } from '../../context/public-note/Context';
import { Error } from '~/components/header'
import { useNavigatorContext } from '~/providers/navigator/Context';


type Props = {
    isUpdate: boolean,
    title: string,
    error?: string
}

const Preview: FC<Props> = ({
    isUpdate,
    title,
    error
}) => {
    const { html, onSubmit, viewId } = useNotePreviewContext()
    const { navigator: Navigator } = useNavigatorContext()
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex w-full items-end'>
                <h3 className='flex-1'>
                    {title}
                </h3>
                <div className='ml-auto flex items-center gap-2 whitespace-nowrap'>
                    {viewId && (
                        <Navigator to={`/note-public/${viewId}`} >公開ページへ</Navigator>
                    )}
                    <ContainedButton disabled={!html} onClick={onSubmit}>{isUpdate ? t('update') : t('publish')}</ContainedButton>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default Preview;