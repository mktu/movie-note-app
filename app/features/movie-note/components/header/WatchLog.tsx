import type { FC } from 'react';
import { useTranslation } from 'react-i18next';


import Star from '~/components/icons/Star';
import { TextButton } from '~/components/buttons';
import { useNavigatorContext } from '~/providers/navigator/Context';

type Props = {
    admirationDate?: string,
    stars?: number,
    detailPath: string,
    onOpenWatchLogDialog: () => void
}

const WatchLog: FC<Props> = ({
    admirationDate,
    stars,
    detailPath,
    onOpenWatchLogDialog
}) => {
    const { t } = useTranslation('common')
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <>
            <div className='flex items-center gap-2 text-sm'>
                <TextButton onClick={onOpenWatchLogDialog} className='underline' paddings='px-1 py-0'>{t('watched-log')}: {admirationDate || t('no-watched-log')}</TextButton>
                <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400' />
                    <span>{stars || '-'}</span>
                </div>
                <span>|</span>
                <Navigator to={detailPath} className='text-text-main underline'>{t('show-detail')}</Navigator>
            </div>
        </>

    );
};

export default WatchLog;