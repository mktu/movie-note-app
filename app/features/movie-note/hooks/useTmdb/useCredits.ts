import { useCallback, useContext, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { Credits } from "../../utils/tmdb"

const useCredits = () => {
    const tmdb = useContext(TmdbContext)
    const [credits, setCredits] = useState<Credits | null>(null)
    const requestCredits = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const d = await tmdb.getCredits(id)
        setCredits(d)
    }, [tmdb])
    return {
        requestCredits,
        credits
    }
}

export default useCredits