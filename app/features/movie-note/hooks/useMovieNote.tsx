import type { Credits, TmdbDetail } from "~/features/tmdb"
import type { MovieNoteType } from "../server/db"
import { useCallback, useState } from "react"
import type { UpdateMovieNote, WatchState } from "@type-defs/frontend"
import format from "date-fns/format"
import { useTranslation } from "react-i18next"
import { useNavigatorContext } from "~/providers/navigator/Context"
import { setMovieNotePreviewHtml } from "../utils/localstorage"
import { getTemplates as getTemplatesApi } from "../utils/api"
import type { ListTemplateType } from "../server/db/template"

type Props = {
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    error?: string,
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void
}

export const useMovieNote = ({
    movieNoteDetail,
    tmdbCredits,
    tmdbDetail,
    error,
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
        const res = await getTemplatesApi()
        const templates = await res.json<ListTemplateType>()
        return templates
    }, [])
    const title = movieNoteDetail?.title || ''
    const detail = tmdbDetail
    const published = Boolean(movieNoteDetail?.published)
    const detailPath = `/app/movies/${detail?.id}?lng=${i18n.language}`
    const previewPath = `/app/note-preview/${detail?.id}?lng=${i18n.language}&update=${published}`
    const credits = tmdbCredits || null
    const stars = movieNoteDetail?.stars || 0
    const formattedWatchDate = movieNoteDetail?.admiration_date || ''
    const html = movieNoteDetail?.html || undefined
    const watchState = movieNoteDetail?.watch_state as WatchState
    const imagePath = detail?.poster_path || detail?.backdrop_path || ''
    const submitNote = useCallback(({
        newWatchState,
        newAdmirationDate,
        newStars,
        newPublished,
        newNote,
        newHtml,
        debounceTimeout
    }: {
        newWatchState?: WatchState,
        newAdmirationDate?: string,
        newNote?: string,
        newStars?: number,
        newPublished?: boolean
        newHtml?: string,
        debounceTimeout?: number
    }) => {
        detail && onSubmit({
            title: detail.title,
            thumbnail: detail.poster_path || detail.backdrop_path || '',
            tmdbId: detail.id,
            imdbId: detail.imdb_id,
            movieMemo: newNote !== undefined ? newNote : content?.get() || '',
            admirationDate: newAdmirationDate !== undefined ? format(new Date(newAdmirationDate), 'yyyy-MM-dd') : formattedWatchDate,
            stars: newStars !== undefined ? newStars : stars,
            lng: detail.lng,
            watchState: newWatchState || watchState,
            published: newPublished !== undefined ? newPublished : published || false,
            html: newHtml !== undefined ? newHtml : html || ''
        }, debounceTimeout)
    }, [content, detail, formattedWatchDate, html, onSubmit, published, stars, watchState])
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
        getTemplates
    }
}