import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';

import Search, { Reselect } from '../search-title';
import Error from './Error';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import type { ComponentProps } from 'react'
import Stars from '~/components/icons/Stars';
import Check from '~/components/icons/Check';
import type { WatchState } from '@type-defs/frontend';

type Props = {
    onClickSave: (state: WatchState) => void,
    className?: string,
    canSave?: boolean
    error?: string,
    initialSelected?: string,
    onReselect?: () => void
} & ComponentProps<typeof Search>

const Header = forwardRef<HTMLDivElement, Props>(({
    onClickSave,
    className,
    selected,
    setSelected,
    canSave,
    error,
    initialSelected,
    onReselect
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()
    return (
        <>
            <div ref={(elm) => {
                if (typeof ref === 'function') {
                    ref(elm)
                } else if (ref?.current) {
                    ref.current = elm;
                }
                setObserverElm(elm)
            }} className={clsx(className, 'flex w-full items-center gap-2 py-4',
                !inView && 'fixed top-0 right-0 z-20 bg-white/80 px-10 shadow')}>
                <div className='flex w-full flex-1 items-center'>
                    {initialSelected ? (
                        <Reselect floating={!inView} selected={initialSelected} onReselect={onReselect} />
                    ) : (
                        <Search {...{ selected, setSelected }} />
                    )}
                </div>
                <OutlinedButton border='border-2 border-yellow-500 group-hover:border-yellow-600' disabled={!canSave} className='group ml-auto flex items-center gap-1 bg-surface-main' onClick={() => { onClickSave('lookforward') }}>
                    <Stars className='h-5 w-5 fill-yellow-500 group-hover:fill-yellow-600' />
                    <span className='text-yellow-500 group-hover:text-yellow-600'>{t('lookforward')}</span>
                </OutlinedButton>
                <OutlinedButton border='border-2 border-green-500 group-hover:border-green-600' disabled={!canSave} className='group flex items-center gap-1 bg-surface-main' onClick={() => { onClickSave('watched') }}>
                    <Check className='h-5 w-5 fill-green-500 group-hover:fill-green-600' />
                    <span className='text-green-500 group-hover:text-green-600'>
                        {t('watched')}
                    </span>
                </OutlinedButton>
            </div>
            <div ref={inViewRef} />
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Header['displayName'] = 'header'

export default Header;