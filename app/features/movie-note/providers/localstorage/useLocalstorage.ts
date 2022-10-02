import { useLayoutEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import type { MovieDetailType, StoredMovieNote } from "../../type-defs";
import { MOVIE_DETAIL_TYPE } from "../../utils/constants";
import * as localstorage from '../../utils/localstorage'



const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => { };


const useLocalstorage = (init: {
    movieNoteType: MovieDetailType
}) => {
    const [cookies, setCookie] = useCookies([MOVIE_DETAIL_TYPE]);
    const [loaded, setLoaded] = useState(false)

    const [movieDetailType, setMovieDetailType] = useState<MovieDetailType>(init.movieNoteType)
    // localstorage only works on the client side 
    useBrowserLayoutEffect(() => {
        setMovieDetailType(cookies[MOVIE_DETAIL_TYPE] ?
            (cookies[MOVIE_DETAIL_TYPE]) as MovieDetailType : 'detail')
        setLoaded(true)
    }, [])

    const methods = useMemo(() => {
        return {
            getMovieDetailType: () => movieDetailType,
            saveMovieDetailType: (t: MovieDetailType) => {
                setMovieDetailType(t)
                setCookie(MOVIE_DETAIL_TYPE, t)
            },
            nonReactive: {
                getMovieNoteState: () => loaded ? localstorage.getMovieNoteState() : null,
                saveMovieNoteState: (state: StoredMovieNote) => {
                    localstorage.saveMovieNoteState(state)
                },
                removeMovieNoteState: () => {
                    localstorage.removeMovieNoteState()
                }
            }

        }
    }, [movieDetailType, setCookie, loaded])
    return methods
}

export default useLocalstorage