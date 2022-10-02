import { useBrowserLayoutEffect } from '@utils/hooks';
import { useCallback } from 'react';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import * as localstorage from '~/features/movie-note/utils/localstorage'

let init = false

const movieNoteKvDisabled = atom({
    key: 'movieNoteKvDisabled',
    default: false,
});

const useMovieNoteKvDisabled = () => {
    const setMovieNoteKvDisabled_ = useSetRecoilState(movieNoteKvDisabled)
    const setMovieNoteKvDisabled = useCallback((disabled: boolean) => {
        setMovieNoteKvDisabled_(disabled)
        localstorage.setMovieNoteKvDisabled(disabled)
    }, [setMovieNoteKvDisabled_])
    useBrowserLayoutEffect(() => {
        if (!init) {
            setMovieNoteKvDisabled_(localstorage.isMovieNoteKvDisabled())
            init = true
        }
    }, [setMovieNoteKvDisabled_])
    const isMovieNoteKvDisabled = useRecoilValue(movieNoteKvDisabled)
    return { setMovieNoteKvDisabled, isMovieNoteKvDisabled }
}

export {
    useMovieNoteKvDisabled
}