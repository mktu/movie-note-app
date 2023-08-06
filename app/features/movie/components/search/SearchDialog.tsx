import { Dialog } from '@headlessui/react';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Search from './Search';

type Props = {
    open: boolean,
    onClose: () => void
}

const SearchDialog: FC<Props> = ({
    open,
    onClose
}) => {
    const { t } = useTranslation('common')
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-4xl rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title as='h4'>{t('global-search')}</Dialog.Title>
                    <Dialog.Description as='div' className='my-2 max-h-[650px] overflow-y-auto overflow-x-hidden'>
                        <Search onSelectMovie={onClose} />
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>{t('close')}</TextButton>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default SearchDialog;