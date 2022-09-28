import { useLayoutEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import type { MovieDetailType } from "../../type-defs";
import { MOVIE_DETAIL_TYPE } from "../../utils/constants";



const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => { };


const useLocalstorage = (init: {
    movieNoteType: MovieDetailType
}) => {
    const [cookies, setCookie] = useCookies([MOVIE_DETAIL_TYPE]);

    const [movieDetailType, setMovieDetailType] = useState<MovieDetailType>(init.movieNoteType)
    // localstorage only works on the client side 
    useBrowserLayoutEffect(() => {
        setMovieDetailType(cookies[MOVIE_DETAIL_TYPE] ?
            (cookies[MOVIE_DETAIL_TYPE]) as MovieDetailType : 'detail')
    }, [])

    const methods = useMemo(() => {
        return {
            getMovieDetailType: () => movieDetailType,
            saveMovieDetailType: (t: MovieDetailType) => {
                setMovieDetailType(t)
                setCookie(MOVIE_DETAIL_TYPE, t)
            },
        }
    }, [movieDetailType, setCookie])
    return methods
}

export default useLocalstorage