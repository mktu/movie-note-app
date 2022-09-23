import { useEffect, useMemo, useState } from "react";
import type * as localstorage from "@utils/localstorage";

type LocalstorageType = typeof localstorage
const InitialSidebarWidth = 250

const useLocalstorage = (localstorage: LocalstorageType) => {

    const [localstorageLoaded, setLocalstorageLoaded] = useState(false)
    const [sidebarWidth, setSidebarWidth] = useState<number>(InitialSidebarWidth)
    const [visibleSidebarWidth, setVisibleSidebarWidth] = useState<number>(InitialSidebarWidth)
    const [isKvDisabled, setKvDisabled] = useState(false)
    const [visiblePerformance, setVisiblePerformance] = useState(false)

    // localstorage only works on the client side 
    useEffect(() => {
        setSidebarWidth(localstorage.getSidebarWidth())
        setVisibleSidebarWidth(localstorage.getVisibleSidebarWidth() || InitialSidebarWidth)
        setKvDisabled(localstorage.isKvDisabled)
        setVisiblePerformance(localstorage.getVisiblePerformance())
        setLocalstorageLoaded(true)
    }, [localstorage])

    const methods = useMemo(() => {
        return {
            getSidebarWidth: () => sidebarWidth,
            saveSidebarWidth: (w: number) => {
                setSidebarWidth(w)
                localstorage.saveSidebarWidth(w)
            },
            saveVisibleSidebarWidth: (w: number) => {
                setVisibleSidebarWidth(w)
                localstorage.saveVisibleSidebarWidth(w)
            },
            getVisibleSidebarWidth: () => visibleSidebarWidth,
            isKvDisabled: () => isKvDisabled,
            setKvDisabled: (b: boolean) => {
                setKvDisabled(b)
                localstorage.setKvDisabled(b)
            },
            saveVisiblePerformance: (b: boolean) => {
                setVisiblePerformance(b)
                localstorage.saveVisiblePerformance(b)
            },
            getVisiblePerformance: () => visiblePerformance,
            localstorageLoaded
        }
    }, [sidebarWidth, visibleSidebarWidth, isKvDisabled, localstorage, visiblePerformance, localstorageLoaded])

    return methods
}

export default useLocalstorage