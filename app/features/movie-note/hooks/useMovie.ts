import { useMemo, useState } from "react"
import format from 'date-fns/format'

export const useReview = (tmdbId?: string) => {
    const [stars, setStars] = useState(0)
    const [admirationDate, setAdmirationDate] = useState('')
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