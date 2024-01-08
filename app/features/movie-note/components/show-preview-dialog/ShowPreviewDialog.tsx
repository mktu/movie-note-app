import type { FC } from 'react'
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { ContainedButton, TextButton } from '~/components/buttons';

type Props = {
    open: boolean,
    onClose: () => void,
    onPublish: () => void,
    title: string,
    previewUrl: string
}

const ShowPreviewDialog: FC<Props> = ({
    open,
    onClose,
    onPublish,
    title,
    previewUrl
}) => {
    const { t } = useTranslation('common')
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-xl rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title as='h4'>{t('publish-note-dialog-title', { title })}</Dialog.Title>
                    <Dialog.Description as='div' className='my-2 max-h-[650px] overflow-y-auto overflow-x-hidden'>
                        <p>
                            ノートを公開することで、他のユーザーにあなたのノートを閲覧できるようになります
                        </p>
                        <div className='flex items-center justify-center'>
                            <img src='/PublishNote.svg' alt='google-sign-in' width={250} height={250} />
                        </div>
                        <p>&#8251; ノートを公開中は、自動保存が無効になります。「更新」ボタンを押してノートを更新してください</p>
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>{t('close')}</TextButton>
                        <ContainedButton onClick={onPublish}>{t('to-preview')}</ContainedButton>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ShowPreviewDialog;