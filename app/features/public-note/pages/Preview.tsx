import type { FC } from 'react'
import { PreviewHeader } from '../components/header';
import PreviewBody from '../components/preview';
import Settings from '../components/settings';
import type { TmdbDetail } from '~/features/tmdb';
import { PreviewLayout } from '../components/layout';
import NotePreviewProvider from '../context/public-note';
import type { OnPublish } from '../hooks/useMovieNotePreview';
import type { PublicNote } from '@type-defs/frontend';
import { useNavigatorContext } from '~/providers/navigator/Context';


type Props = {
    tmdbDetail: TmdbDetail,
    onPublish: OnPublish,
    init?: PublicNote
    error?: string
}

const Preview: FC<Props> = ({
    tmdbDetail,
    onPublish,
    init,
    error
}) => {
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    return (
        <NotePreviewProvider onPublish={onPublish} init={init} tmdbId={tmdbDetail.id}>
            <PreviewLayout
                header={<PreviewHeader
                    title={tmdbDetail?.title || ''}
                    error={error}
                    onClickBack={() => {
                        navigate(`/app/notes/${tmdbDetail.id}`)
                    }}
                />}
                preview={<PreviewBody />}
                publishSettings={<Settings />}
            />
        </NotePreviewProvider>
    );
};

export default Preview;