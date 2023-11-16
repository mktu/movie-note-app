import { Dialog } from '@headlessui/react';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';

type Props = {
    open: boolean,
    onClose: () => void,
    onRemove: () => void,
    title: string
}

const RemoveTemplateDialog: FC<Props> = ({
    open,
    onClose,
    onRemove,
    title
}) => {
    const { t } = useTranslation('common')
    return (
        <Dialog open={open} onClose={onClose}>
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-sm rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title className='' as='h4'>{t('remove-template')}</Dialog.Title>
                    <Dialog.Description className='my-2'>
                        {t('remove-template-description', { title })}
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>Cancel</TextButton>
                        <TextButton className='font-semibold text-destructive-main' onClick={onRemove}>{t('delete')}</TextButton>
                    </div>
                </Dialog.Panel>
            </div>

        </Dialog>
    );
};

export default RemoveTemplateDialog;