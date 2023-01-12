import type { OgpType } from "functions/api/ogp"
import { useCallback, useEffect, useState } from "react"

const useOgp = (url: string) => {
    const [ogp, setOgp] = useState<OgpType>()
    const fetcher = useCallback(async () => {
        const params = new URLSearchParams({ url });
        const res = await fetch('/api/ogp?' + params.toString())
        if (res.ok) {
            setOgp(await res.json())
        }
    }, [url])
    useEffect(() => {
        fetcher()
    }, [fetcher])
    return {
        ogp
    }
}

export default useOgp