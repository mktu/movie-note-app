import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';

import { Dialog } from '@headlessui/react';

import WatchLog from './WatchLog';

import type { FC } from 'react';
import type { WatchLogs } from '../../hooks/useMovie';

type Props = {
    open: boolean,
    onClose: () => void,
    watchLogs: WatchLogs,
}

const WatchLogDialog: FC<Props> = ({
    open,
    onClose,
    watchLogs,
}) => {
    const { t } = useTranslation('common')
    const [admirationDate, setAdmirationDate] = useState(watchLogs.admirationDate || '')
    const [stars, setStars] = useState(watchLogs.stars || 0)
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className='fixed inset-0 flex items-center justify-center '>
                <Dialog.Panel className="w-full max-w-sm rounded border border-border-main bg-white p-4 text-text-main shadow">
                    <Dialog.Title className='' as='h4'>{t('edit-watch-log')}</Dialog.Title>
                    <Dialog.Description className='my-2'>
                        <WatchLog
                            admirationDate={admirationDate}
                            setAdmirationDate={setAdmirationDate}
                            stars={stars}
                            setStars={setStars}
                        />
                    </Dialog.Description>
                    <hr className='my-1' />
                    <div className='flex items-center justify-end'>
                        <TextButton className='font-semibold' onClick={onClose}>Cancel</TextButton>
                        <TextButton className='font-semibold text-destructive-main' onClick={() => {
                            watchLogs.setAdmirationDate(admirationDate)
                            watchLogs.setStars(stars)
                            onClose()
                        }}>{t('save')}</TextButton>
                    </div>
                </Dialog.Panel>
            </div>

        </Dialog>
    );
};

export default WatchLogDialog;