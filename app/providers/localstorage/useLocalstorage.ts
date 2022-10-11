import { useLayoutEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie"
import type * as localstorage from "@utils/localstorage";
import { SIDEBAR_WIDTH_KEY } from "@utils/cookie/constants";
import { InitialSidebarWidth } from "@utils/constants";

type LocalstorageType = typeof localstorage

const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => { };


const useLocalstorage = (localstorage: LocalstorageType) => {
    const [cookies, setCookie] = useCookies([SIDEBAR_WIDTH_KEY]);

    const [localstorageLoaded, setLocalstorageLoaded] = useState(false)
    const [sidebarWidth, setSidebarWidth] = useState<number>(InitialSidebarWidth)
    const [lastSidebarWidth, setLastSidebarWidth] = useState<number>(InitialSidebarWidth)
    const [visiblePerformance, setVisiblePerformance] = useState(false)

    // localstorage only works on the client side 
    useBrowserLayoutEffect(() => {
        setSidebarWidth(cookies[SIDEBAR_WIDTH_KEY] ?
            Number(cookies[SIDEBAR_WIDTH_KEY]) : InitialSidebarWidth)
        setLastSidebarWidth(localstorage.getLastSidebarWidth() || InitialSidebarWidth)
        setVisiblePerformance(localstorage.getVisiblePerformance())
        setLocalstorageLoaded(true)
    }, [localstorage])

    const methods = useMemo(() => {
        return {
            getSidebarWidth: () => sidebarWidth,
            saveSidebarWidth: (w: number) => {
                setSidebarWidth(w)
                setCookie(SIDEBAR_WIDTH_KEY, w, { path: '/app/' })
            },
            saveLastSidebarWidth: (w: number) => {
                setLastSidebarWidth(w)
                localstorage.saveLastSidebarWidth(w)
            },
            getLastSidebarWidth: () => lastSidebarWidth,
            saveVisiblePerformance: (b: boolean) => {
                setVisiblePerformance(b)
                localstorage.saveVisiblePerformance(b)
            },
            getVisiblePerformance: () => visiblePerformance,
            localstorageLoaded
        }
    }, [sidebarWidth, lastSidebarWidth, localstorage, visiblePerformance, localstorageLoaded, setCookie])

    return methods
}

export default useLocalstorage