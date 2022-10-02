import { useState } from "react"
import { useTranslation } from "react-i18next"
import { usePrompt } from "~/hooks/useBlocker"

const useMovieNoteChangeMonitor = () => {
    const { t } = useTranslation('common')
    const [dirty, setDirty] = useState(false)
    const { unblock } = usePrompt(t('leave-screen'), dirty)

    return {
        setDirty, unblock
    }
}

export {
    useMovieNoteChangeMonitor
}