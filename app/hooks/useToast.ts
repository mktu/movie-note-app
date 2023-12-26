import { useEffect } from "react"
import { toast } from "react-toastify"

export const useSuccessUpdateMessage = (message: string, show: boolean, updatedAt: string | null) => {
    useEffect(() => {
        if (show && updatedAt) {
            toast.success(message)
        }
    }, [show, message, updatedAt])
}

export const useSuccessCreateMessage = (message: string, show: boolean) => {
    useEffect(() => {
        if (show) {
            toast.success(message)
        }
    }, [show, message])
}