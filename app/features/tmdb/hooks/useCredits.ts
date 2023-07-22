import { useCallback, useContext, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { Credits } from '~/features/tmdb'

const useCredits = (init?: Credits) => {
    const tmdb = useContext(TmdbContext)
    const [credits, setCredits] = useState<Credits | null>(init || null)
    const requestCredits = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const d = await tmdb.getCredits(id)
        setCredits(d)
    }, [tmdb])
    const resetCredit = () => {
        setCredits(null)
    }
    return {
        requestCredits,
        credits,
        resetCredit
    }
}

export default useCredits