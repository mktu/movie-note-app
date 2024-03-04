import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ButtonBase } from '~/components/buttons';
import { useNotePreviewContext } from '../../context/public-note/Context';
import { Error } from '~/components/header'


type Props = {
    title: string,
    error?: string,
    onClickBack: () => void
}

const Preview: FC<Props> = ({
    title,
    error,
    onClickBack
}) => {
    const { onSubmit } = useNotePreviewContext()
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex w-full items-center'>
                <h3 className='flex-1'>
                    {title}
                </h3>
                <div className='ml-auto flex items-center whitespace-nowrap'>
                    <ButtonBase onClick={onClickBack} className='-mr-px whitespace-nowrap rounded-l-lg border border-border-main bg-surface-main px-4 py-2 font-medium text-text-main hover:bg-surface-hover hover:text-text-dark'>{t('back-to-note')}</ButtonBase>
                    <ButtonBase className='-ml-px whitespace-nowrap rounded-r-lg border border-primary-main bg-primary-main px-4 py-2 font-medium text-onprimary-main'
                        onClick={onSubmit}
                    >{t('save')}</ButtonBase>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default Preview;