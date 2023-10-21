import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import Search, { Reselect } from '../search-title';
import Error from './Error';

import type { ComponentProps } from 'react'
import type { WatchState } from '@type-defs/frontend';
import AddFill from '~/components/icons/AddFill';

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
            <div ref={inViewRef} />
            {!inView && (
                <div className='h-[64px]' /> // for layout sfift
            )}
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
                <OutlinedButton border='border-2 border-text-main group-hover:border-text-main' disabled={!canSave} className='group ml-auto flex items-center gap-1 bg-surface-main' onClick={() => { onClickSave('lookforward') }}>
                    <AddFill className='h-5 w-5 fill-text-main group-hover:fill-text-dark' />
                    <span className='text-text-main group-hover:text-text-dark'>{t('add-note')}</span>
                </OutlinedButton>
            </div>

            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Header['displayName'] = 'header'

export default Header;