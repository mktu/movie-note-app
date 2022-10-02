import { LAST_SIDEBAR_WIDTH_KEY } from "@utils/cookie/constants";

const VISIBLE_PERFORMANCE_KEY = 'visible-performance'

function isNumeric(n: string) {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
}

export const saveLastSidebarWidth = (width: number) => {
    localStorage.setItem(LAST_SIDEBAR_WIDTH_KEY, String(width))
}

export const getLastSidebarWidth = () => {
    const ret = localStorage.getItem(LAST_SIDEBAR_WIDTH_KEY)
    return (ret && isNumeric(ret)) ? Number(ret) : 0
}

export const saveVisiblePerformance = (show: boolean) => {
    localStorage.setItem(VISIBLE_PERFORMANCE_KEY, String(show))
}

export const getVisiblePerformance = () => {
    const ret = localStorage.getItem(VISIBLE_PERFORMANCE_KEY)
    return ret ? ret.toLowerCase() === 'true' : false
}