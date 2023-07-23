import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContainedButton } from '~/components/buttons';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import Error from './Error';
import WatchStateButtons from './WatchStateButtons';

import type { WatchState } from '@type-defs/frontend';
import MiniImage from './MiniImage';
import type { WatchLogs } from '../../hooks/useMovie';
import WatchLog from './WatchLog';

type Props = {
    onClickSave: (state?: WatchState) => void,
    title: string,
    image?: string,
    className?: string,
    canSave?: boolean
    error?: string,
    watchState?: WatchState,
    watchLogs: WatchLogs
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    onClickSave,
    className,
    canSave,
    title,
    image,
    watchLogs,
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
                <MiniImage
                    src={image}
                    title={title}
                />
                <div className='flex w-full flex-1 items-center'>
                    <div>
                        <div className='text-lg font-semibold text-text-main'>{title}</div>
                        <WatchLog
                            watchLogs={watchLogs}
                        />
                    </div>
                    <WatchStateButtons watchState={watchState} onClick={setWatchState} />
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