import type { Credits, TmdbDetail } from "~/features/tmdb"
import type { MovieNoteType } from "../server/db"
import { useCallback, useMemo, useState } from "react"
import type { UpdateMovieNote, WatchState } from "@type-defs/frontend"
import format from "date-fns/format"
import { useTranslation } from "react-i18next"
import { useNavigatorContext } from "~/providers/navigator/Context"
import { clearMovieNote, getMovieNote, setMovieNotePreviewHtml } from "../utils/localstorage"
import { getTemplates as getTemplatesApi } from "../utils/api"
import type { ListTemplateItemType } from "../../note-template/server/db/template"
import type { Video } from "~/features/tmdb/utils"
import { formatDateTime } from "@utils/time"

type Props = {
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    trailers?: Video[],
    error?: string,
    hasPublicNote: boolean,
    published: boolean,
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void
}

export const useMovieNote = ({
    movieNoteDetail,
    tmdbCredits,
    tmdbDetail,
    error,
    hasPublicNote,
    published,
    onSubmit,
}: Props) => {
    const { i18n } = useTranslation()
    const [content, setContent] = useState<{ get: () => string }>()
    const [htmlConvertUtil, setHtmlConvertUtil] = useState<{ convert: () => Promise<string> }>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()

    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const setHtmlConverter = useCallback((convert: () => Promise<string>) => {
        setHtmlConvertUtil({ convert })
    }, [])
    const getTemplates = useCallback(async () => {
        if (!movieNoteDetail?.tmdb_id) {
            return []
        }
        const res = await getTemplatesApi(movieNoteDetail.tmdb_id)
        const templates = await res.json<(ListTemplateItemType & { editable: boolean })[]>()
        return templates.map(v => ({
            ...v,
            onEdit: v.editable ? () => {
                navigate(`/app/note-template/${v.id}`)
            } : undefined
        }))
    }, [movieNoteDetail?.tmdb_id, navigate])
    const title = movieNoteDetail?.title || ''
    const detail = tmdbDetail
    const detailPath = `/app/movies/${detail?.id}?lng=${i18n.language}`
    const previewPath = `/app/note-preview/${detail?.id}?lng=${i18n.language}`
    const credits = tmdbCredits || null
    const stars = movieNoteDetail?.stars || 0
    const formattedWatchDate = movieNoteDetail?.admiration_date || ''
    const html = movieNoteDetail?.html || undefined
    const watchState = movieNoteDetail?.watch_state as WatchState
    const imagePath = detail?.poster_path || detail?.backdrop_path || ''
    const lastUpdated = movieNoteDetail?.updated_at ? formatDateTime(movieNoteDetail?.updated_at) : ''
    const [noteInLocalStorage, setNoteInLocalStorage] = useState(getMovieNote())
    const initialNote = useMemo(() => {
        if (movieNoteDetail?.tmdb_id === noteInLocalStorage?.id) {
            return noteInLocalStorage?.note
        }
        return movieNoteDetail?.memo
    }, [movieNoteDetail?.memo, movieNoteDetail?.tmdb_id, noteInLocalStorage?.id, noteInLocalStorage?.note])
    const [editing, setEditing] = useState(initialNote !== movieNoteDetail?.memo)
    const { t } = useTranslation()
    const unsavedNoteInfo = noteInLocalStorage && {
        link: `/app/notes/${noteInLocalStorage.id}`,
        message: noteInLocalStorage.id === movieNoteDetail?.tmdb_id ? t('unsaved-content-exists') : t('unsaved-note-exists'),
        isCurrentNote: noteInLocalStorage.id === movieNoteDetail?.tmdb_id,
        onDestroy: () => {
            if (noteInLocalStorage?.note) {
                clearMovieNote()
                setNoteInLocalStorage(null)
            }
        }
    }
    const submitNote = useCallback(async ({
        newWatchState,
        newAdmirationDate,
        newStars,
        updatePublicNote
    }: {
        newWatchState?: WatchState,
        newAdmirationDate?: string,
        newStars?: number,
        updatePublicNote?: boolean
    }) => {
        setEditing(false)
        clearMovieNote()
        detail && onSubmit({
            title: detail.title,
            thumbnail: detail.poster_path || detail.backdrop_path || '',
            tmdbId: detail.id,
            imdbId: detail.imdb_id,
            movieMemo: content?.get() || '',
            admirationDate: newAdmirationDate !== undefined ? format(new Date(newAdmirationDate), 'yyyy-MM-dd') : formattedWatchDate,
            stars: newStars !== undefined ? newStars : stars,
            lng: detail.lng,
            watchState: newWatchState || watchState,
            hasPublicNote: hasPublicNote || false,
            html: (updatePublicNote && hasPublicNote) ? (await htmlConvertUtil?.convert() || '') : html || ''
        })
    }, [detail, onSubmit, content, formattedWatchDate, stars, watchState, hasPublicNote, htmlConvertUtil, html])
    const showPreview = useCallback((previewHtml: string) => {
        setMovieNotePreviewHtml(previewHtml)
        navigate(previewPath)
    }, [navigate, previewPath])

    return {
        detail,
        credits,
        stars,
        watchState,
        imagePath,
        formattedWatchDate,
        hasPublicNote,
        published,
        detailPath,
        previewPath,
        title,
        error,
        setHtmlConverter,
        setContentGetter,
        htmlConvertUtil,
        submitNote,
        showPreview,
        getTemplates,
        lastUpdated,
        initialNote,
        editing,
        setEditing,
        unsavedNoteInfo
    }
}