import { useCallback, useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../../movie-note/utils/localstorage"
import type { PublicNote } from "@type-defs/frontend"

export type OnPublish = (content: PublicNote) => void

export const useMovieNotePreview = (onPublish: OnPublish, init?: PublicNote) => {
    const [html, setHtml] = useState('')
    const [summary, setSummary] = useState(init?.summary || '')
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    const onSubmit = useCallback(() => {
        onPublish({
            note: html,
            summary,
            public: true
        })
    }, [html, onPublish, summary])
    return {
        html,
        summary,
        setSummary,
        onSubmit
    }
}

