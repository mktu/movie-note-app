import type { FC } from 'react'
import Parser from 'html-react-parser';
import { useMovieNotePreview } from '../hooks/useMovieNotePreview';
import { PreviewHeader } from '../components/header';
import { PreviewLayout } from '../components/layout';
import type { TmdbDetail } from '~/features/tmdb';

type Props = {
    tmdbDetail?: TmdbDetail,
    onPublish: (content: string) => void,
    onBack: () => void,
}

const Preview: FC<Props> = ({
    tmdbDetail,
    onPublish,
    onBack
}) => {
    const { html } = useMovieNotePreview()
    return (
        <PreviewLayout
            header={<PreviewHeader
                onPublish={() => {
                    onPublish(html)
                }}
                onBack={onBack}
                title={tmdbDetail?.title || ''} />}
        >
            {Parser(html)}
        </PreviewLayout>

    );
};

export default Preview;