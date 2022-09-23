const SIDEBAR_WIDTH_KEY = 'sidebar-width'
const VISIBLE_SIDEBAR_WIDTH_KEY = 'visible-sidebar-width'
const IS_NOTE_KV_DISABLED = 'note-kv-disabled'
const VISIBLE_PERFORMANCE_KEY = 'visible-performance'

function isNumeric(n: string) {
    return !isNaN(parseFloat(n)) && isFinite(Number(n));
}

export const getSidebarWidth = () => {
    const ret = localStorage.getItem(SIDEBAR_WIDTH_KEY)
    return (ret && isNumeric(ret)) ? Number(ret) : 0
}

export const saveSidebarWidth = (width: number) => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(width))
}
export const saveVisibleSidebarWidth = (width: number) => {
    localStorage.setItem(VISIBLE_SIDEBAR_WIDTH_KEY, String(width))
}

export const getVisibleSidebarWidth = () => {
    const ret = localStorage.getItem(VISIBLE_SIDEBAR_WIDTH_KEY)
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