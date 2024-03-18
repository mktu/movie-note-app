import { useCallback, useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../../movie-note/utils/localstorage"
import type { AddPublicNote, PublicNote } from "@type-defs/frontend"
import type { TmdbDetail } from "~/features/tmdb"
import { useTranslation } from "react-i18next"

export type OnPublish = (content: AddPublicNote) => void

export const useMovieNotePreview = (onPublish: OnPublish, tmdbDetail: TmdbDetail, init?: PublicNote) => {
    const [html, setHtml] = useState('')
    const [file, setFile] = useState<File | null>()
    const [imgError, setImgError] = useState('')
    const [summary, setSummary] = useState(init?.summary || '')
    const [isPublic, setIsPublic] = useState(init?.public || false)
    const { id: tmdbId, poster_path, backdrop_path } = tmdbDetail
    const [coverImage, setCoverImageUrl] = useState(init?.coverImage || null)
    const tmdbImageUrl = poster_path || backdrop_path
    const [useDefaultImage, setUseDefaultImage] = useState(false)
    const { t } = useTranslation('common')
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    const onSubmit = useCallback(() => {
        onPublish({
            note: html,
            summary,
            public: isPublic,
            tmdbId,
            coverImageFile: file || undefined,
            useDefaultTopImage: useDefaultImage
        })
    }, [file, html, isPublic, onPublish, summary, tmdbId, useDefaultImage])
    const onSelectDefaultImage = useCallback(() => {
        setFile(null)
        setCoverImageUrl(null)
        setUseDefaultImage(true)
    }, [])
    const onChangeCoverImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return
        }
        if (e.target.files[0].size > 1024 * 1024 * 5) {
            setImgError(t('image-size-over-5mb'))
            return
        }
        setFile(e.target.files[0])
        setCoverImageUrl(URL.createObjectURL(e.target.files[0]))
        setUseDefaultImage(false)
    }, [t])
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
        setIsPublic,
        tmdbImageUrl,
        coverImage,
        imgError,
        onSelectDefaultImage,
        onChangeCoverImage
    }
}
