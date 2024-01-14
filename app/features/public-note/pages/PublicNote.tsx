import type { FC } from 'react'
import { PublicNoteHeader } from '../components/header';
import Note from '../components/note';
import type { TmdbDetail } from '~/features/tmdb';
import { PublicNoteLayout } from '../components/layout';
import type { PublicNote } from '../type-defs'


type Props = {
    publicNote: PublicNote
    tmdbDetail?: TmdbDetail,
    error?: string
}

const PublicNotePage: FC<Props> = ({
    publicNote,
    tmdbDetail,
    error
}) => {
    return (
        <PublicNoteLayout
            header={<PublicNoteHeader
                title={tmdbDetail?.title || ''}
                error={error}
            />}
            note={<Note html={publicNote.note} />}
        />
    );
};

export default PublicNotePage;