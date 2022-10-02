import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

import { MOVIE_DETAIL_TYPE } from '../../utils/constants';

import type { MovieDetailType } from '../../type-defs';
import { useBrowserLayoutEffect } from '@utils/hooks';

let initMovieDetailType = false

export const movieDetailType = atom<MovieDetailType>({
    key: 'movieDetailType',
    default: 'detail'
});

const useMovieDetailType = () => {
    const [cookies, setCookie] = useCookies([MOVIE_DETAIL_TYPE]);
    const setMovieDetailType_ = useSetRecoilState(movieDetailType)
    const setMovieDetailType = useCallback((t: MovieDetailType) => {
        setMovieDetailType_(t)
        setCookie(MOVIE_DETAIL_TYPE, t)
    }, [setMovieDetailType_, setCookie])
    useBrowserLayoutEffect(() => {
        if (!initMovieDetailType) {
            setMovieDetailType_(cookies[MOVIE_DETAIL_TYPE] ?
                (cookies[MOVIE_DETAIL_TYPE]) as MovieDetailType : 'detail')
            initMovieDetailType = true
        }
    }, [setMovieDetailType_, cookies])
    const movieDetailTypeValue = useRecoilValue(movieDetailType)
    return { setMovieDetailType, movieDetailType: movieDetailTypeValue }
}

export {
    useMovieDetailType
}