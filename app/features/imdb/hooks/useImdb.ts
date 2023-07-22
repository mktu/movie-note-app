import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import type { ImdbRate } from "../types"

const root = '/api/imdb/'

const useImdb = (imdbId?: string) => {
    const [rateInfo, setRateInfo] = useState<ImdbRate>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { t } = useTranslation('common')
    const failedGetImdbMessage = t('failed-get-imdb')
    const fetcher = useCallback(async () => {
        if (!imdbId) {
            return
        }
        setLoading(true)
        const res = await fetch(root + imdbId)
        if (!res.ok) {
            console.error(res.text)
            setError(failedGetImdbMessage)
            return
        }
        const rate = await res.json() as ImdbRate
        setRateInfo(rate)
        setLoading(false)
    }, [imdbId, failedGetImdbMessage])
    useEffect(() => {
        fetcher()
    }, [fetcher])
    return {
        rateInfo,
        loading,
        error
    }
}

export default useImdb