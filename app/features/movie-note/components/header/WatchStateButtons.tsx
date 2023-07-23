import type { WatchState } from '@type-defs/frontend';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Check from '~/components/icons/Check';
import Stars from '~/components/icons/Stars';

import type { FC } from 'react'

type Props = {
    watchState?: WatchState,
    onClick: (watchState: WatchState) => void
}


const WatchStateButtons: FC<Props> = ({
    onClick,
    watchState
}) => {
    const { t } = useTranslation('common')
    return (
        <>
            <TextButton className='group ml-auto flex items-center gap-1' onClick={() => { onClick('lookforward') }}>
                <>
                    <Stars className={clsx('h-5 w-5 group-hover:fill-yellow-500',
                        watchState === 'lookforward' ? 'fill-yellow-500' : 'fill-text-disabled')} />
                    <span className={clsx('whitespace-nowrap group-hover:text-yellow-500',
                        watchState === 'lookforward' ? 'text-yellow-500' : 'text-text-disabled')}>{t('lookforward')}</span>
                </>
            </TextButton>
            <TextButton className='group flex items-center gap-1' onClick={() => { onClick('watched') }}>
                <>
                    <Check className={clsx('h-5 w-5 group-hover:fill-green-500',
                        watchState === 'watched' ? ' fill-green-500' : 'fill-text-disabled'
                    )} />
                    <span className={clsx('whitespace-nowrap group-hover:text-green-500',
                        watchState === 'watched' ? 'text-green-500' : 'text-text-disabled')}>
                        {t('watched')}
                    </span>
                </>
            </TextButton>
        </>
    );
};

export default WatchStateButtons;