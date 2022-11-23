import { useCallback, useState } from "react"
import { useTmdbContext } from '~/providers/tmdb/Context'
import type { TmdbDetail } from "../../utils/tmdb"

const useDetail = (init?: TmdbDetail) => {
    const tmdb = useTmdbContext()
    const [detail, setDetail] = useState<TmdbDetail | null>(init || null)
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