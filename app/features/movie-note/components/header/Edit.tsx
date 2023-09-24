import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import useFloatingHeader from '~/hooks/useFloatingHeader';

import Error from './Error';

import type { WatchState } from '@type-defs/frontend';
import MiniImage from './MiniImage';
import WatchLog from './WatchLog';
import { ContainedButton } from '~/components/buttons';

type Props = {
    onChangeState: (state?: WatchState) => void,
    title: string,
    image?: string,
    className?: string,
    error?: string,
    watchState?: WatchState,
    admirationDate?: string,
    stars?: number,
    detailPath: string,
    published?: boolean,
    onOpenWatchLogDialog: () => void,
    onPublish: () => void
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    onChangeState,
    className,
    title,
    image,
    error,
    watchState,
    detailPath,
    published,
    onOpenWatchLogDialog,
    admirationDate,
    stars,
    onPublish
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
                            admirationDate={admirationDate}
                            stars={stars}
                            detailPath={detailPath}
                            onOpenWatchLogDialog={onOpenWatchLogDialog}
                            watchState={watchState}
                            onChangeState={onChangeState}
                        />
                    </div>

                    <div className='ml-auto flex items-center gap-2 font-semibold'>
                        {published ? (
                            <ContainedButton onClick={onPublish}>{t('update-publish')}</ContainedButton>
                        ) : (
                            <ContainedButton onClick={onPublish}>{t('publish')}</ContainedButton>
                        )}
                    </div>
                </div>
            </div >
            {error && (
                <Error error={t(error)} />
            )
            }
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;