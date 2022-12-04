import { useBrowserLayoutEffect } from '@utils/hooks';
import { useCallback } from 'react';
import { atom, useSetRecoilState, useRecoilValue } from 'recoil';
import * as localstorage from '~/features/movie-note/utils/localstorage'
import { useSearchParamContext } from '~/providers/search-param/Context';

let init = false

const movieNoteKvDisabled = atom({
    key: 'movieNoteKvDisabled',
    default: false,
});

const useMovieNoteKvDisabled = () => {
    const setMovieNoteKvDisabled_ = useSetRecoilState(movieNoteKvDisabled)
    const { setSearchParams } = useSearchParamContext();
    const setMovieNoteKvDisabled = useCallback((disabled: boolean) => {
        setMovieNoteKvDisabled_(disabled)
        localstorage.setMovieNoteKvDisabled(disabled)
        setSearchParams({ disableKv: `${disabled}` })
    }, [setMovieNoteKvDisabled_, setSearchParams])
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