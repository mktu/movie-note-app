import { useCallback, useContext, useState } from "react"
import TmdbContext from '~/providers/tmdb/Context'
import type { MovieDetail } from "../../utils/tmdb"

const useDetail = () => {
    const tmdb = useContext(TmdbContext)
    const [detail, setDetail] = useState<MovieDetail | null>(null)
    const requestDetail = useCallback(async (id: string) => {
        const d = await tmdb.getDetail(id)
        setDetail(d)
    }, [tmdb])
    return {
        requestDetail,
        detail
    }
}

export default useDetail