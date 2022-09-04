import { useMemo, useState } from "react"
import format from 'date-fns/format'

export const useReview = (initStar?: number, initAdmirationDate?: string) => {
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

const useMovie = () => {

    return {

    }
}

export default useMovie