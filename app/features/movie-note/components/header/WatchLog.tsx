import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import WatchLogDialog from '../watch-log/WatchLogDialog';

import Star from '~/components/icons/Star';
import { TextButton } from '~/components/buttons';
import type { WatchLogs } from '../watch-log';

type Props = {
    initAdmirationDate?: string,
    initStars?: number,
    onSaveWatchLogs: (watchLogs: WatchLogs) => void
}

const WatchLog: FC<Props> = ({
    initAdmirationDate,
    initStars,
    onSaveWatchLogs
}) => {
    const { t } = useTranslation('common')
    const [openWatchLog, setOpenWatchLog] = useState(false)
    return (
        <>
            <div className='flex items-center gap-2 text-sm'>
                <TextButton onClick={() => {
                    setOpenWatchLog(true)
                }} className='underline' paddings='px-1 py-0'>{t('watched-log')}: {initAdmirationDate || t('no-watched-log')}</TextButton>
                <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400' />
                    <span>{initStars || '-'}</span>
                </div>
                <span>|</span>
                <span>作品情報を見る</span>

            </div>
            <WatchLogDialog
                open={openWatchLog}
                initAdmirationDate={initAdmirationDate}
                initStars={initStars}
                onClose={() => {
                    setOpenWatchLog(false)
                }}
                onSave={(admirationDate, stars) => {
                    onSaveWatchLogs({
                        admirationDate,
                        stars
                    })
                    setOpenWatchLog(false)
                }}
            />
        </>

    );
};

export default WatchLog;