import { useEffect, useState } from "react"

export const useAppLayout = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    useEffect(() => {
        if (document) {
            document.body.style.overflow = openMobileMenu ? 'hidden' : 'auto'
        }
    }, [openMobileMenu])
    return {
        openMobileMenu, setOpenMobileMenu
    }
}