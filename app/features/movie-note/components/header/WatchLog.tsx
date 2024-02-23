import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Star from '~/components/icons/Star';
import { useNavigatorContext } from '~/providers/navigator/Context';

import type { WatchState } from '@type-defs/frontend';
import Stars from '~/components/icons/Stars';
import clsx from 'clsx';
import Check from '~/components/icons/Check';
import { useMovieNoteContext } from '../../context/movie-note/Context';

type Props = {
    onOpenWatchLogDialog: () => void,
}

const WatchLog: FC<Props> = ({
    onOpenWatchLogDialog,
}) => {
    const { t } = useTranslation('common')
    const { navigator: Navigator } = useNavigatorContext()
    const {
        stars,
        published,
        watchState,
        submitNote,
        formattedWatchDate,
        detailPath
    } = useMovieNoteContext()
    const onClickWatchState = useCallback((newWatchState: WatchState) => {
        if (newWatchState === 'watched') {
            onOpenWatchLogDialog()
        } else {
            submitNote({
                newWatchState
            })
        }
    }, [onOpenWatchLogDialog, submitNote])

    return (
        <>
            <div className='flex items-center gap-4 text-sm'>
                <div className='flex items-center'>
                    <TextButton paddings='px-2 py-2' className='group flex items-center gap-1' onClick={() => {
                        onClickWatchState('watched')
                    }}>
                        <Check className={clsx('h-5 w-5 group-hover:fill-green-500',
                            watchState === 'watched' ? ' fill-green-500' : 'fill-text-disabled'
                        )} />
                        <span className={clsx('whitespace-nowrap group-hover:text-green-500',
                            watchState === 'watched' ? 'text-green-500' : 'text-text-disabled')}>
                            {watchState === 'watched' ? `${t('watched')}:${formattedWatchDate || t('no-watched-log')}` : t('watched')}
                        </span>
                    </TextButton>
                    <TextButton paddings='px-2 py-2' className='group flex items-center gap-1' onClick={() => { onClickWatchState('lookforward') }}>
                        <Stars className={clsx('h-5 w-5 group-hover:fill-yellow-500',
                            watchState === 'lookforward' ? 'fill-yellow-500' : 'fill-text-disabled')} />
                        <span className={clsx('whitespace-nowrap group-hover:text-yellow-500',
                            watchState === 'lookforward' ? 'text-yellow-500' : 'text-text-disabled')}>{t('lookforward')}</span>
                    </TextButton>
                </div>
                <div className='flex items-center gap-1'>
                    <Star className='h-4 w-4 fill-yellow-400' />
                    <span>{stars || '-'}</span>
                </div>
                <span className='text-text-label'>|</span>
                <div className='text-text-label'>
                    {published ? t('published-note') : t('unpublished-note')}
                </div>
                <span className='text-text-label'>|</span>
                <Navigator to={detailPath} className='text-text-main underline'>{t('show-detail')}</Navigator>
            </div>
        </>

    );
};

export default WatchLog;