import type { FC } from 'react'
import { PublicNoteHeader } from '../components/header';
import Note from '../components/note';
import type { TmdbDetail } from '~/features/tmdb';
import { PublicNoteLayout } from '../components/layout';
import type { PublicNote, User } from '@type-defs/frontend';


type Props = {
    publicNote: PublicNote
    tmdbDetail?: TmdbDetail,
    creator: User
    error?: string
}

const PublicNotePage: FC<Props> = ({
    publicNote,
    tmdbDetail,
    creator,
    error
}) => {
    return (
        <PublicNoteLayout
            header={<PublicNoteHeader
                title={tmdbDetail?.title || ''}
                error={error}
                creator={creator}
                lastUpdated={publicNote.updatedAt || publicNote.createdAt}
                posterImage={tmdbDetail?.poster_path || tmdbDetail?.backdrop_path}
                summary={publicNote.summary}
            />}
            note={<Note html={publicNote.note} />}
        />
    );
};

export default PublicNotePage;