const NOTIFY_TEMPLATE = 'movie-note-notify-template'

export type NotifyType = 'create' | 'update'

export const setTemplate = (type: NotifyType) => {
    localStorage.setItem(NOTIFY_TEMPLATE, type)
}

export const clearTemplate = () => {
    localStorage.removeItem(NOTIFY_TEMPLATE)
}

export const getTemplate = (): NotifyType => {
    return localStorage.getItem(NOTIFY_TEMPLATE) as NotifyType
}