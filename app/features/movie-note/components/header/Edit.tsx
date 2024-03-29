import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFloatingHeader from '~/hooks/useFloatingHeader';
import { Error } from '~/components/header'
import MiniImage from './MiniImage';
import WatchLog from './WatchLog';
import { ButtonBase } from '~/components/buttons';
import { useMovieNoteContext } from '../../context/movie-note/Context';
import ShowPreviewDialog from '../show-preview-dialog/ShowPreviewDialog';
import UnsavedNote from './UnsavedNote';
import PaddingTop from './PaddingTop';

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
        published,
        showPreview,
        previewPath,
        submitNote,
        lastUpdated } = useMovieNoteContext()
    const [showDialog, setShowDialog] = useState(false)


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
            }} className={clsx(className, 'flex w-full flex-col items-center gap-1',
                !inView && 'fixed top-0 right-0 z-20 bg-white/80 pb-2 shadow')}>
                <PaddingTop />
                <UnsavedNote />
                <div className='flex w-full items-center gap-2 px-10'>
                    <MiniImage
                        src={imagePath}
                        title={title}
                    />
                    <div className='flex w-full flex-1 items-center'>
                        <div>
                            <div className='flex items-center gap-2 px-2 text-lg font-semibold text-text-main'>
                                <span>{title}</span>
                                {published ? (
                                    <span className='rounded bg-blue-100 px-3 py-1 text-sm text-blue-500'>{t('published-note')}</span>
                                ) : (
                                    <span className='rounded bg-gray-100 px-3 py-1 text-sm text-text-label'>{t('unpublished-note')}</span>
                                )}
                            </div>
                            <WatchLog
                                onOpenWatchLogDialog={onOpenWatchLogDialog}
                            />
                        </div>

                        <div className='ml-auto flex flex-col gap-2'>
                            <div className='flex items-center justify-end gap-4'>
                                <div className='inline-flex rounded-md shadow-sm' role='group'>
                                    <ButtonBase onClick={async () => {
                                        htmlConvertUtil && showPreview(await htmlConvertUtil?.convert())
                                    }} className='-mr-px whitespace-nowrap rounded-l-lg border border-border-main bg-surface-main px-4 py-2 font-medium text-text-main hover:bg-surface-hover hover:text-text-dark'>{t('publish-settings')}</ButtonBase>
                                    <ButtonBase className='-ml-px whitespace-nowrap rounded-r-lg border border-primary-main bg-primary-main px-4 py-2 font-medium text-onprimary-main'
                                        onClick={() => {
                                            submitNote({ updatePublicNote: true })
                                        }}
                                    >{t('save')}</ButtonBase>
                                </div>

                            </div>
                            <div className='text-right text-sm text-text-label'>{t('update-date', {
                                date: lastUpdated, interpolation: {
                                    escapeValue: false
                                }
                            })}</div>
                        </div>
                    </div>
                </div>
            </div >
            {error && (
                <Error error={t(error)} />
            )
            }
            {showDialog && (
                <ShowPreviewDialog onPublish={async () => {
                    htmlConvertUtil && showPreview(await htmlConvertUtil?.convert())
                }} title={title} previewUrl={previewPath} open={showDialog} onClose={() => { setShowDialog(false) }} />
            )}
        </>
    );
});

Edit['displayName'] = 'edit-header'

export default Edit;