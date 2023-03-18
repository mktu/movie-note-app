import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';

import Search, { Reselect } from '../search-title';
import Error from './Error';
import useFloatingHeader from './useFloatingHeader';

import type { ComponentProps } from 'react'

type Props = {
    onClickSave: () => void,
    className?: string,
    canSave?: boolean
    error?: string,
    initialSelected?: string,
    onReselect?: () => void
} & ComponentProps<typeof Search>

const New = forwardRef<HTMLDivElement, Props>(({
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
                <ContainedButton disabled={!canSave} className='ml-auto' onClick={onClickSave}>{t('save')}</ContainedButton>
            </div>
            <div ref={inViewRef} />
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

New['displayName'] = 'new-header'

export default New;