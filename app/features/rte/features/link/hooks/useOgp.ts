import type { OgpType } from "functions/api/ogp"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const useOgp = (url: string, onFetchOgp: (ogp: OgpType) => void) => {
    const [ogp, setOgp] = useState<OgpType>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { t } = useTranslation('common')
    const fetcher = useCallback(async () => {
        const params = new URLSearchParams({ url });
        const res = await fetch('/api/ogp?' + params.toString())
        if (res.ok) {
            const ret = await res.json<OgpType>()
            setOgp(ret)
            onFetchOgp(ret)
        } else {
            console.error(res)
            setError(t('ogp-error', { code: res.statusText }))
        }
        setLoading(false)
    }, [url, t, onFetchOgp])
    useEffect(() => {
        fetcher()
    }, [fetcher])
    return {
        ogp,
        error,
        loading
    }
}

export default useOgp