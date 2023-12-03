import clsx from 'clsx';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import useFloatingHeader from '~/hooks/useFloatingHeader';
import { Error } from '~/components/header'
import MiniImage from './MiniImage';
import WatchLog from './WatchLog';
import { Indicator } from '~/components/buttons';
import { useMovieNoteContext } from '../../context/movie-note/Context';

type Props = {
    className?: string,
    onOpenWatchLogDialog: () => void,
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    className,
    onOpenWatchLogDialog,
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()

    const {
        htmlConvertUtil,
        imagePath,
        title,
        error,
        showPreview,
        published
    } = useMovieNoteContext()


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
                    src={imagePath}
                    title={title}
                />
                <div className='flex w-full flex-1 items-center'>
                    <div>
                        <div className='text-lg font-semibold text-text-main'>{title}</div>
                        <WatchLog
                            onOpenWatchLogDialog={onOpenWatchLogDialog}
                        />
                    </div>

                    <div className='relative ml-auto flex items-center gap-2'>
                        <Indicator color={published ? 'blue' : 'gray'} onClick={async () => {
                            htmlConvertUtil && showPreview(await htmlConvertUtil?.convert())
                        }}>
                            {published ? t('published-note') : t('unpublished-note')}
                        </Indicator>
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