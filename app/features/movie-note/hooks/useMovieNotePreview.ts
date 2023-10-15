import { useEffect, useState } from "react"
import { getMovieNotePreviewHtml } from "../utils/localstorage"


export const useMovieNotePreview = () => {
    const [html, setHtml] = useState('')
    useEffect(() => {
        setHtml(getMovieNotePreviewHtml() || '')
    }, [])
    return {
        html
    }
}

