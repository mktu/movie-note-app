import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { OutlinedButton } from '~/components/buttons';
import AddFill from '~/components/icons/AddFill';
import PenIcon from '~/components/icons/Pen';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import Search, { Reselect } from '../search-title';
import Error from './Error';

import type { ComponentProps } from 'react'
type Props = {
    onNavigateNote: () => void,
    className?: string,
    canSave?: boolean
    error?: string,
    initialSelected?: string,
    onReselect?: () => void,
    hasNote: boolean
} & ComponentProps<typeof Search>

const Header = forwardRef<HTMLDivElement, Props>(({
    onNavigateNote,
    className,
    selected,
    setSelected,
    canSave,
    error,
    initialSelected,
    onReselect,
    hasNote
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()
    return (
        <>
            <div ref={inViewRef} />
            {!inView && (
                <div className='md:h-[64px]' /> // for layout sfift
            )}
            <div ref={(elm) => {
                if (typeof ref === 'function') {
                    ref(elm)
                } else if (ref?.current) {
                    ref.current = elm;
                }
                setObserverElm(elm)
            }} className={clsx(className, 'flex w-full items-center gap-2 pb-4 md:py-4',
                !inView && 'right-0 top-0 md:fixed md:z-20 md:bg-white/80 md:px-10 md:shadow')}>
                <div className='flex w-full flex-1 items-center'>
                    {initialSelected ? (
                        <Reselect floating={!inView} selected={initialSelected} onReselect={onReselect} />
                    ) : (
                        <Search {...{ selected, setSelected }} />
                    )}
                </div>
                {hasNote ? (
                    <OutlinedButton border='border-2 border-text-main group-hover:border-text-main' disabled={!canSave} className='group ml-auto hidden items-center gap-1 bg-surface-main md:flex' onClick={onNavigateNote}>
                        <PenIcon className='h-5 w-5 fill-text-main group-hover:fill-text-dark' />
                        <span className='text-text-main group-hover:text-text-dark'>{t('edit-note')}</span>
                    </OutlinedButton>
                ) : (
                    <OutlinedButton border='border-2 border-text-main group-hover:border-text-main' disabled={!canSave} className='group ml-auto hidden items-center gap-1 bg-surface-main md:flex' onClick={onNavigateNote}>
                        <AddFill className='h-5 w-5 fill-text-main group-hover:fill-text-dark' />
                        <span className='text-text-main group-hover:text-text-dark'>{t('add-note')}</span>
                    </OutlinedButton>
                )}
            </div >
            {error && (
                <Error error={t(error)} />
            )
            }
        </>
    );
});

Header['displayName'] = 'header'

export default Header;