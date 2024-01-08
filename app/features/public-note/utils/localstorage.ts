const NOTIFY_PUBLISH = 'movie-note-notify-publish'

export type NotifyType = 'create' | 'update'

export const setPublished = (type: NotifyType) => {
    localStorage.setItem(NOTIFY_PUBLISH, type)
}

export const clearPublished = () => {
    localStorage.removeItem(NOTIFY_PUBLISH)
}

export const getPublished = (): NotifyType => {
    return localStorage.getItem(NOTIFY_PUBLISH) as NotifyType
}