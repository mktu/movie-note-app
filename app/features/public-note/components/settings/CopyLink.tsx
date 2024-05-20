import { useRef, type FC } from 'react'
import { copyToClipBoard } from '@utils/clipboard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { IconButton } from '~/components/buttons';
import NoteIcon from '~/components/icons/Note'
import { TextInput } from '~/components/inputs';

type Props = {
    url: string
}

const CopyLink: FC<Props> = ({
    url
}) => {
    const { t } = useTranslation('common')
    const ref = useRef<HTMLInputElement>(null)
    return (
        <div className='flex flex-col justify-center gap-2'>
            <label htmlFor='url-link'>{t('public-url')}</label>
            <div className='flex items-center gap-2'>
                <TextInput ref={ref} onFocus={() => {
                    ref.current && ref.current.select()
                }} id='url-link' readOnly className='flex-1 bg-surface-hover text-text-main' value={url} />
                <IconButton onClick={() => {
                    copyToClipBoard(url, () => {
                        toast.success(t('copy-url-to-clipboard'))
                    })
                }} name='copy' className='size-5 rounded border fill-text-main stroke-text-main'>
                    <NoteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default CopyLink;