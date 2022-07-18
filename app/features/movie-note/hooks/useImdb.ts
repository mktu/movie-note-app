import { useCallback, useEffect, useState } from "react"

type ImdbRate = {
    rate: string,
    denominator: string,
    parameter: string
}

const root = '/api/imdb/'

const useImdb = (imdbId?: string) => {
    const [rateInfo, setRateInfo] = useState<ImdbRate>()
    const fetcher = useCallback(async () => {
        if (!imdbId) {
            return
        }
        const res = await fetch(root + imdbId)
        if (!res.ok) {
            console.error(res.text)
            return
        }
        const rate = await res.json() as ImdbRate
        setRateInfo(rate)
    }, [imdbId])
    useEffect(() => {
        fetcher()
    }, [fetcher])
    return {
        rateInfo
    }
}

export default useImdb