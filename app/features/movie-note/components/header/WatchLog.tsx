import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import WatchLogDialog from '../watch-log/WatchLogDialog';

import type { WatchLogs } from '../../hooks/useMovie';
import Star from '~/components/icons/Star';
import { TextButton } from '~/components/buttons';

type Props = {
    watchLogs: WatchLogs
}

const WatchLog: FC<Props> = ({
    watchLogs
}) => {
    const { t } = useTranslation('common')
    const [openWatchLog, setOpenWatchLog] = useState(false)
    return (
        <>
            <div className='flex items-center gap-2 text-sm'>
                <TextButton onClick={() => {
                    setOpenWatchLog(true)
                }} className='underline' paddings='px-1 py-0'>{t('watched-log')}: {watchLogs.admirationDate || t('no-watched-log')}</TextButton>
                <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400' />
                    <span>{watchLogs.stars || '-'}</span>
                </div>
                <span>|</span>
                <span>作品情報を見る</span>

            </div>
            <WatchLogDialog
                open={openWatchLog}
                watchLogs={watchLogs}
                onClose={() => {
                    setOpenWatchLog(false)
                }}
            />
        </>

    );
};

export default WatchLog;