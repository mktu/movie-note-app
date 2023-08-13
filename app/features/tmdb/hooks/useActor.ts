import { useCallback, useContext, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { Actor, MovieCredits } from '~/features/tmdb'

const useActor = (init?: Actor) => {
    const tmdb = useContext(TmdbContext)
    const [actor, setActor] = useState<Actor | null>(init || null)
    const requestActor = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const d = await tmdb.getActor(id)
        setActor(d)
    }, [tmdb])
    return {
        requestActor,
        actor,
    }
}

const useMovieCredits = (init?: MovieCredits) => {
    const tmdb = useContext(TmdbContext)
    const [movieCredit, setMovieCredit] = useState<MovieCredits | null>(init || null)
    const requestMovieCredit = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const d = await tmdb.getMovieCredit(id)
        setMovieCredit(d)
    }, [tmdb])
    return {
        requestMovieCredit,
        movieCredit
    }
}

export {
    useActor,
    useMovieCredits
}