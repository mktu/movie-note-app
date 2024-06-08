import type { SubmitOptions } from "@remix-run/react"
import { useFetcher } from "@remix-run/react"
import { useCallback, useEffect, useRef } from "react"
type SubmitTarget =
    | HTMLFormElement
    | HTMLButtonElement
    | HTMLInputElement
    | FormData
    | URLSearchParams
    | {
        [name: string]: string
    }
    | null
type DebounceSubmitFunction = (
    target: SubmitTarget,
    argOptions?: SubmitOptions & { debounceTimeout?: number },
) => void

export function useDebounceFetcher<T>() {
    const timeoutRef = useRef<NodeJS.Timeout>()
    useEffect(() => {
        // no initialize step required since timeoutRef defaults undefined
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [timeoutRef])
    const fetcher = useFetcher<T>() as ReturnType<typeof useFetcher<T>> & {
        debounceSubmit?: DebounceSubmitFunction
    }
    const debounceSubmit: DebounceSubmitFunction = useCallback((target, argOptions) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        const { debounceTimeout = 0, ...options } = argOptions || {}
        if (debounceTimeout && debounceTimeout > 0) {
            const current = setTimeout(() => {
                if (timeoutRef.current !== current) {
                    return
                }
                fetcher.submit(target, options)
            }, debounceTimeout)
            timeoutRef.current = current
        } else {
            fetcher.submit(target, options)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        debounceSubmit,
        state: fetcher.state
    }
}