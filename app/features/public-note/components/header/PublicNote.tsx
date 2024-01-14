import { copyToClipBoard } from '@utils/clipboard';
import { toast } from 'react-toastify';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
import { Error } from '~/components/header'


type Props = {
    title: string,
    error?: string
}

const PublicNote: FC<Props> = ({
    title,
    error
}) => {
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex w-full items-end'>
                <h3 className='flex-1'>
                    {title}
                </h3>
                <div className='flex items-center gap-2'>
                    <OutlinedButton onClick={() => {
                        copyToClipBoard(window.location.href, () => {
                            toast.success(t('copy-url-to-clipboard'))
                        })
                    }}>Copy URL</OutlinedButton>
                    <div>author</div>
                </div>
            </div>
            {error && (
                <Error error={t(error)} />
            )}
        </>

    );
};

export default PublicNote;