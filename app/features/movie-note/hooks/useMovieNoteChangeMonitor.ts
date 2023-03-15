import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { usePrompt } from "~/hooks/useBlocker"

const useMovieNoteChangeMonitor = () => {
    const { t } = useTranslation('common')
    const [dirty, setDirty] = useState(false)
    const checkDirty = useCallback((text: string) => {
        const regex = /"text":"([^"]*)"/;
        const match = text.match(regex);
        return Boolean(match && match.length > 1)
    }, [])
    const { unblock } = usePrompt(t('leave-screen'), dirty)

    return {
        setDirty, unblock, checkDirty
    }
}

export {
    useMovieNoteChangeMonitor
}