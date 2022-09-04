import { useCallback, useContext, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { MovieDetail } from "../../utils/tmdb"

const useDetail = (init?: MovieDetail) => {
    const tmdb = useContext(TmdbContext)
    const [detail, setDetail] = useState<MovieDetail | null>(init || null)
    const requestDetail = useCallback(async (id: string) => {
        if (!id) {
            return
        }
        const d = await tmdb.getDetail(id)
        setDetail(d)
    }, [tmdb])
    const resetDetail = () => {
        setDetail(null)
    }
    return {
        requestDetail,
        detail,
        resetDetail
    }
}

export default useDetail