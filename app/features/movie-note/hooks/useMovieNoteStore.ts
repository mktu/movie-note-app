import { useContext } from 'react';
import LorcalstorageContext from '~/features/movie-note/providers/localstorage/Context';

import { parseISODateString } from '@utils/time';

export const useMovieNoteStore = ({
    init,
    noteId,
    lastupdated
}: {
    init?: string | null,
    noteId: string,
    lastupdated?: string
}) => {
    const { nonReactive: { getMovieNoteState, saveMovieNoteState, removeMovieNoteState } } = useContext(LorcalstorageContext)
    const storedInLs = getMovieNoteState()
    const savedAt = lastupdated ? parseISODateString(lastupdated) : null
    const storedAt = storedInLs ? parseISODateString(storedInLs.date) : null
    let stored;
    if (storedAt && savedAt) {
        stored = (storedAt.getTime() > savedAt.getTime() && storedInLs?.id === noteId) ? storedInLs?.note : init
    }
    else if (!storedAt) {
        stored = init || ''
    }
    return {
        stored,
        saveMovieNoteState,
        removeMovieNoteState
    }
}

