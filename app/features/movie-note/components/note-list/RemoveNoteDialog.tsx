import { Dialog } from '@headlessui/react';
import type { FC } from 'react'
import { TextButton } from '~/components/buttons';

type Props = {
    open: boolean,
    onClose: () => void,
    onRemove: () => void,
    title: string
}

const RemoveNoteDialog: FC<Props> = ({
    open,
    onClose,
    onRemove,
    title
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-sm rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title className='' as='h4'>ノートを削除</Dialog.Title>
                    <Dialog.Description className='my-2'>
                        <span className='mr-2'>"{title}"</span>
                        <span>を削除します。一度削除したノートは元に戻すことはできません</span>
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>Cancel</TextButton>
                        <TextButton className='font-semibold text-destructive-main' onClick={onRemove}>削除</TextButton>
                    </div>
                </Dialog.Panel>
            </div>

        </Dialog>
    );
};

export default RemoveNoteDialog;