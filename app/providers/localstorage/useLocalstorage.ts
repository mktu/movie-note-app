import { useMemo, useState } from "react";
import type { LocalstorageType } from "./Context";

const useLocalstorage = (localstorage: LocalstorageType) => {

    const [sidebarWidth, setSidebarWidth] = useState(localstorage.getSidebarWidth())
    const [visibleSidebarWidth, setVisibleSidebarWidth] = useState(localstorage.getVisibleSidebarWidth())
    const [isKvDisabled, setKvDisabled] = useState(localstorage.isKvDisabled)
    const methods = useMemo(() => {
        return {
            getSidebarWidth: () => sidebarWidth,
            saveSidebarWidth: (w) => {
                setSidebarWidth(w)
                localstorage.saveSidebarWidth(w)
            },
            saveVisibleSidebarWidth: (w) => {
                setVisibleSidebarWidth(w)
                localstorage.saveVisibleSidebarWidth(w)
            },
            getVisibleSidebarWidth: () => visibleSidebarWidth,
            isKvDisabled: () => isKvDisabled,
            setKvDisabled: (b) => {
                setKvDisabled(b)
                localstorage.setKvDisabled(b)
            }
        } as typeof localstorage
    }, [sidebarWidth, visibleSidebarWidth, isKvDisabled, localstorage])

    return methods
}

export default useLocalstorage