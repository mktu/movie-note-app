import { useEffect } from "react"
import { toast } from "react-toastify"

export const useSuccessMessage = (message: string, show: boolean) => {
    useEffect(() => {
        if (show) {
            toast.success(message)
        }
    }, [show, message])
}