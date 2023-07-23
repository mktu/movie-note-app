import { useMemo, useState } from "react"
import format from 'date-fns/format'

export const useWatchLog = (initStar?: number | null, initAdmirationDate?: string | null) => {
    const [stars, setStars] = useState(initStar || 0)
    const [admirationDate, setAdmirationDate] = useState(initAdmirationDate || '')
    const formattedWatchDate = useMemo(() => admirationDate ? format(new Date(admirationDate), 'yyyy-MM-dd') : undefined, [admirationDate])
    return {
        stars, setStars,
        setAdmirationDate,
        admirationDate,
        formattedWatchDate
    }
}

export type WatchLogs = ReturnType<typeof useWatchLog>