import { useCallback, useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../../movie-note/utils/localstorage"
import type { AddPublicNote, PublicNote } from "@type-defs/frontend"
import { clearPublished, getPublished, setPublished } from "../utils/localstorage"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export type OnPublish = (content: AddPublicNote) => void

export const useMovieNotePreview = (onPublish: OnPublish, tmdbId: string, init?: PublicNote) => {
    const [html, setHtml] = useState('')
    const [summary, setSummary] = useState(init?.summary || '')
    const [isPublic, setIsPublic] = useState(init?.public || false)
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    const onSubmit = useCallback(() => {
        setPublished(init ? 'update' : 'create')
        onPublish({
            note: html,
            summary,
            public: isPublic,
            tmdbId
        })
    }, [html, init, isPublic, onPublish, summary, tmdbId])
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

export const useMovieNotePublishMessage = () => {
    const { t } = useTranslation()
    useEffect(() => {
        const state = getPublished()
        if (state === 'create') {
            toast.info(t('published-succeeded'))
            clearPublished()
        } else if (state === 'update') {
            toast.info(t('update-succeeded'))
            clearPublished()
        }
    })
}

