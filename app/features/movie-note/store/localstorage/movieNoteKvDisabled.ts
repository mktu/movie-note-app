import { useCallback } from 'react';
import * as localstorage from '~/features/movie-note/utils/localstorage'
import { useSearchParamContext } from '~/providers/search-param/Context';


const useMovieNoteKvDisabled = () => {
    const { setSearchParams } = useSearchParamContext();
    const setMovieNoteKvDisabled = useCallback((disabled: boolean) => {
        localstorage.setMovieNoteKvDisabled(disabled)
        setSearchParams({ disableKv: `${disabled}` })
    }, [setSearchParams])

    const isMovieNoteKvDisabled = useCallback(() => {
        return localstorage.isMovieNoteKvDisabled()
    }, [])
    return { setMovieNoteKvDisabled, isMovieNoteKvDisabled }
}

export {
    useMovieNoteKvDisabled
}