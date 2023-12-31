import { useEffect } from "react"
import { toast } from "react-toastify"

export const useSuccessUpdateMessage = (message: string, requestId?: number) => {
    useEffect(() => {
        if (requestId) {
            toast.success(message)
        }
    }, [message, requestId])
}

export const useSuccessCreateMessage = (message: string, show: boolean) => {
    useEffect(() => {
        if (show) {
            toast.success(message)
        }
    }, [show, message])
}