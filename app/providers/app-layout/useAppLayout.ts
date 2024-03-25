import { useState } from "react"

export const useAppLayout = () => {
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    return {
        openMobileMenu, setOpenMobileMenu
    }
}