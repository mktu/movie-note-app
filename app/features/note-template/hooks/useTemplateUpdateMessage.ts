import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { clearTemplate, getTemplate } from "../utils/localstorage"
import { toast } from "react-toastify"

export const useTemplateUpdateMessage = () => {
    const { t } = useTranslation()
    useEffect(() => {
        const state = getTemplate()
        if (state === 'create') {
            toast.info(t('add-template'))
            clearTemplate()
        } else if (state === 'update') {
            toast.info(t('update-succeeded'))
            clearTemplate()
        }
    })
}