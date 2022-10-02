import { useLayoutEffect, useMemo, useState } from "react";
import type { MovieDetailType, StoredMovieNote } from "../../type-defs";
import * as localstorage from '../../utils/localstorage'



const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => { };

/** deprecated */
const useLocalstorage = (init: {
    movieNoteType: MovieDetailType
}) => {
    const [loaded, setLoaded] = useState(false)

    // localstorage only works on the client side 
    useBrowserLayoutEffect(() => {
        setLoaded(true)
    }, [])

    const methods = useMemo(() => {
        return {
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
    }, [loaded])
    return methods
}

export default useLocalstorage