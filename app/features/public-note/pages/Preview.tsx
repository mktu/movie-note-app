import type { FC } from 'react'
import { PreviewHeader } from '../components/header';
import PreviewBody from '../components/preview';
import Settings from '../components/settings';
import type { TmdbDetail } from '~/features/tmdb';
import { PreviewLayout } from '../components/layout';
import NotePreviewProvider from '../context/public-note';
import type { OnPublish } from '../hooks/useMovieNotePreview';
import type { PublicNote } from '@type-defs/frontend';


type Props = {
    tmdbDetail: TmdbDetail,
    isUpdate: boolean,
    onPublish: OnPublish,
    init?: PublicNote
    error?: string
}

const Preview: FC<Props> = ({
    tmdbDetail,
    isUpdate,
    onPublish,
    init,
    error
}) => {
    return (
        <NotePreviewProvider onPublish={onPublish} init={init} tmdbId={tmdbDetail.id}>
            <PreviewLayout
                header={<PreviewHeader
                    isUpdate={isUpdate}
                    title={tmdbDetail?.title || ''}
                    error={error}
                />}
                preview={<PreviewBody />}
                publishSettings={<Settings />}
            />
        </NotePreviewProvider>
    );
};

export default Preview;