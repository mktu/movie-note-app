import { useEffect, useMemo, useState } from "react";
import type { LocalstorageType } from "./Context";

const useLocalstorage = (localstorage: LocalstorageType) => {

    const [sidebarWidth, setSidebarWidth] = useState<number | null>(0)
    const [visibleSidebarWidth, setVisibleSidebarWidth] = useState<number | null>(0)
    const [isKvDisabled, setKvDisabled] = useState(false)
    const [visiblePerformance, setVisiblePerformance] = useState(false)

    // localstorage only works on the client side 
    useEffect(() => {
        setSidebarWidth(localstorage.getSidebarWidth())
        setVisibleSidebarWidth(localstorage.getVisibleSidebarWidth())
        setKvDisabled(localstorage.isKvDisabled)
        setVisiblePerformance(localstorage.getVisiblePerformance())
    }, [localstorage])

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
            },
            saveVisiblePerformance: (b) => {
                setVisiblePerformance(b)
                localstorage.saveVisiblePerformance(b)
            },
            getVisiblePerformance: () => visiblePerformance
        } as typeof localstorage
    }, [sidebarWidth, visibleSidebarWidth, isKvDisabled, localstorage, visiblePerformance])

    return methods
}

export default useLocalstorage