import type { FC } from 'react';
import { useTranslation } from 'react-i18next';


import Star from '~/components/icons/Star';
import { TextButton } from '~/components/buttons';

type Props = {
    admirationDate?: string,
    stars?: number,
    onOpenDetailDialog: () => void,
    onOpenWatchLogDialog: () => void
}

const WatchLog: FC<Props> = ({
    admirationDate,
    stars,
    onOpenDetailDialog,
    onOpenWatchLogDialog
}) => {
    const { t } = useTranslation('common')
    return (
        <>
            <div className='flex items-center gap-2 text-sm'>
                <TextButton onClick={onOpenWatchLogDialog} className='underline' paddings='px-1 py-0'>{t('watched-log')}: {admirationDate || t('no-watched-log')}</TextButton>
                <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400' />
                    <span>{stars || '-'}</span>
                </div>
                <span>|</span>
                <TextButton className='underline' paddings='px-1 py-0'
                    onClick={onOpenDetailDialog}
                >{t('show-detail')}</TextButton>
            </div>
        </>

    );
};

export default WatchLog;