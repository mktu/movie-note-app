import { useCallback, useState } from "react"
import { useTmdbContext } from "~/providers/tmdb/Context"
import type { TmdbTrends } from "../../utils/tmdb"

const useTrends = (init?: TmdbTrends) => {
    const tmdb = useTmdbContext()
    const [trends, setTrends] = useState<TmdbTrends | null>(init || null)
    const requestDetail = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const t = await tmdb.getTrends()
        setTrends(t)
    }, [tmdb])
    const resetDetail = () => {
        setTrends(null)
    }
    return {
        requestDetail,
        trends,
        resetDetail
    }
}

export default useTrends