import { useCallback, useState } from "react"
import { useNavigatorContext } from "~/providers/navigator/Context"

export const useNoteTemplate = () => {
    const [content, setContent] = useState<{ get: () => string }>()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()

    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])

    return {
        setContentGetter,
        content,
        navigate
    }
}