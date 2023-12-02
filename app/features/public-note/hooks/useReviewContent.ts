import { useCallback, useEffect } from "react"

export const usePreview = ({ noteId }: {
    noteId?: string
}) => {
    const fetchMyNote = useCallback(async () => {
        if (!noteId) {
            return
        }
        const res = await fetch(`/api/notes/preview/${noteId}`)
        const { html } = await res.json<{ html: string }>()
        console.log(html)
    }, [noteId])
    useEffect(() => {
        fetchMyNote()
    })
}