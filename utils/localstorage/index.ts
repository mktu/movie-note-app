import { LAST_SIDEBAR_WIDTH_KEY } from "@utils/cookie/constants";

const IS_NOTE_KV_DISABLED = 'note-kv-disabled'
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

export const isKvDisabled = () => {
    const ret = localStorage.getItem(IS_NOTE_KV_DISABLED)
    return ret ? ret.toLowerCase() === 'true' : false
}

export const setKvDisabled = (disabled: boolean) => {
    localStorage.setItem(IS_NOTE_KV_DISABLED, String(disabled))
}

export const saveVisiblePerformance = (show: boolean) => {
    localStorage.setItem(VISIBLE_PERFORMANCE_KEY, String(show))
}

export const getVisiblePerformance = () => {
    const ret = localStorage.getItem(VISIBLE_PERFORMANCE_KEY)
    return ret ? ret.toLowerCase() === 'true' : false
}