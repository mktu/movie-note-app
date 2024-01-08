import type { FC } from 'react'
import { useMovieNoteContext } from '../../context/movie-note/Context';

const PaddingTop: FC = () => {
    const { unsavedNoteInfo } = useMovieNoteContext()
    return (
        <div className='mt-2' style={{ display: (unsavedNoteInfo && !unsavedNoteInfo.isCurrentNote) ? 'none' : 'block' }} />
    );
};

export default PaddingTop;