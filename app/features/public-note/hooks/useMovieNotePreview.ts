import { useCallback, useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../../movie-note/utils/localstorage"
import type { PublicNote } from "@type-defs/frontend"
import { clearPublished, getPublished, setPublished } from "../utils/localstorage"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export type OnPublish = (content: PublicNote) => void

export const useMovieNotePreview = (onPublish: OnPublish, init?: PublicNote) => {
    const [html, setHtml] = useState('')
    const [summary, setSummary] = useState(init?.summary || '')
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    const onSubmit = useCallback(() => {
        setPublished(init ? 'update' : 'create')
        onPublish({
            note: html,
            summary,
            public: true
        })
    }, [html, init, onPublish, summary])
    return {
        html,
        summary,
        setSummary,
        onSubmit
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

