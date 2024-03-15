import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"

export const useUpdateNotification = (successDate?: number | null, error?: string) => {
    const { t } = useTranslation()
    useEffect(() => {
        if (error) {
            return
        }
        if (successDate) {
            toast.info(t('update-succeeded'))
        }
    }, [error, successDate, t])
}
