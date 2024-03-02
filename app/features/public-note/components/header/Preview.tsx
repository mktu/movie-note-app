import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import { useNotePreviewContext } from '../../context/public-note/Context';
import { Error } from '~/components/header'


type Props = {
    title: string,
    error?: string
}

const Preview: FC<Props> = ({
    title,
    error
}) => {
    const { onSubmit } = useNotePreviewContext()
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex w-full items-center'>
                <p>TBD: back to link</p>
                <h3 className='flex-1'>
                    {title}
                </h3>
                <div className='ml-auto flex flex-col justify-center gap-2 whitespace-nowrap'>
                    <ContainedButton className='w-auto' onClick={onSubmit}>{t('save')}</ContainedButton>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default Preview;