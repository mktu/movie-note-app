import { forwardRef, useState } from 'react'
import { ContainedButton, TextButton } from '~/components/buttons';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import Error from './Error'
import useFloatingHeader from './useFloatingHeader';
import type { WatchState } from '@type-defs/frontend';
import Check from '~/components/icons/Check';
import Stars from '~/components/icons/Stars';

type Props = {
    onClickSave: (state?: WatchState) => void,
    title: string,
    className?: string,
    canSave?: boolean
    error?: string,
    watchState?: WatchState
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    onClickSave,
    className,
    canSave,
    title,
    error,
    watchState: watchStatebase
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()
    const [watchState, setWatchState] = useState<WatchState | undefined>(watchStatebase)
    return (
        <>
            <div ref={(elm) => {
                if (typeof ref === 'function') {
                    ref(elm)
                } else if (ref?.current) {
                    ref.current = elm;
                }
                setObserverElm(elm)
            }} className={clsx(className, 'flex w-full items-center gap-2 py-2',
                !inView && 'fixed top-0 right-0 z-20 bg-white/80 px-10 shadow')}>
                <div className='flex w-full flex-1 items-center text-lg font-semibold text-text-main'>
                    {title}
                    <TextButton className='group ml-auto flex items-center gap-1' onClick={() => { setWatchState('lookforward') }}>
                        <Stars className={clsx('h-5 w-5 group-hover:fill-yellow-500',
                            watchState === 'lookforward' ? 'fill-yellow-500' : 'fill-text-disabled')} />
                        <span className={clsx('whitespace-nowrap group-hover:text-yellow-500',
                            watchState === 'lookforward' ? 'text-yellow-500' : 'text-text-disabled')}>{t('lookforward')}</span>
                    </TextButton>
                    <TextButton className='group flex items-center gap-1' onClick={() => { setWatchState('watched') }}>
                        <Check className={clsx('h-5 w-5 group-hover:fill-green-500',
                            watchState === 'watched' ? ' fill-green-500' : 'fill-text-disabled'
                        )} />
                        <span className={clsx('whitespace-nowrap group-hover:text-green-500',
                            watchState === 'watched' ? 'text-green-500' : 'text-text-disabled')}>
                            {t('watched')}
                        </span>
                    </TextButton>
                </div>
                <div className='ml-auto flex items-center gap-2 font-semibold'>
                    <ContainedButton disabled={!canSave} onClick={() => {
                        onClickSave(watchState)
                    }}>{t('update')}</ContainedButton>
                </div>
            </div>
            <div ref={inViewRef} />
            {error && (
                <Error error={t(error)} />
            )}
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;