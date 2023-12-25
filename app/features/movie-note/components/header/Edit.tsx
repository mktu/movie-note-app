import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFloatingHeader from '~/hooks/useFloatingHeader';
import { Error } from '~/components/header'
import MiniImage from './MiniImage';
import WatchLog from './WatchLog';
import { ButtonBase, OutlinedButton } from '~/components/buttons';
import { useMovieNoteContext } from '../../context/movie-note/Context';
import Switch from '~/components/switch/Switch';
import ShowPreviewDialog from '../show-preview-dialog/ShowPreviewDialog';

type Props = {
    className?: string,
    onOpenWatchLogDialog: () => void,
    onPublish: (previewHtml: string) => void
}

const Edit = forwardRef<HTMLDivElement, Props>(({
    className,
    onOpenWatchLogDialog,
    onPublish
}, ref) => {
    const { t } = useTranslation('common')
    const { setObserverElm, ref: inViewRef, inView } = useFloatingHeader()

    const {
        htmlConvertUtil,
        imagePath,
        title,
        error,
        showPreview,
        previewPath,
        published
    } = useMovieNoteContext()
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
                        <Switch colorType='info' label={published ? t('published-note') : t('unpublished-note')} enabled={published} setEnabled={async (checked) => {
                            if (checked) {
                                setShowDialog(true)
                            }
                        }} />
                        {published ? (
                            <div className='inline-flex rounded-md shadow-sm' role='group'>
                                <ButtonBase onClick={async () => {
                                    htmlConvertUtil && showPreview(await htmlConvertUtil?.convert())
                                }} className='-mr-px rounded-l-lg border border-border-main bg-surface-main px-4 py-2 font-medium text-text-main hover:bg-surface-hover hover:text-text-dark'>プレビュー</ButtonBase>
                                <ButtonBase className='-ml-px rounded-r-lg border border-primary-main bg-primary-main px-4 py-2 font-medium text-onprimary-main' >保存</ButtonBase>
                            </div>

                        ) : null}
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