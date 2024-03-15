import { useCallback, useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../../movie-note/utils/localstorage"
import type { AddPublicNote, PublicNote } from "@type-defs/frontend"

export type OnPublish = (content: AddPublicNote) => void

export const useMovieNotePreview = (onPublish: OnPublish, tmdbId: string, init?: PublicNote) => {
    const [html, setHtml] = useState('')
    const [summary, setSummary] = useState(init?.summary || '')
    const [isPublic, setIsPublic] = useState(init?.public || false)
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    const onSubmit = useCallback(() => {
        onPublish({
            note: html,
            summary,
            public: isPublic,
            tmdbId
        })
    }, [html, isPublic, onPublish, summary, tmdbId])
    const viewId = init?.viewId
    const hasPublicNote = Boolean(init)
    return {
        html,
        summary,
        viewId,
        setSummary,
        onSubmit,
        isPublic,
        hasPublicNote,
        setIsPublic
    }
}
