export type Auth = {
    id: string,
    provider: number,
    created_at: number,
    user_id?: string
}

export type User = {
    id: string,
    created_at: number,
    name?: string,
    image?: string,
    comment?: string
}

export type UserView = User & {
    auth_id: string,
}

export type MovieNoteTable = {
    user_id: string,
    tmdb_id: string,
    lng: string,
    memo: string | null,
    stars: number,
    admiration_date: string | null
}

export type MovieNoteListViewItem = {
    stars: number,
    user_id: string,
    thumbnail?: string,
    title?: string,
    admiration_date?: string
}

export type MovieInfoTable = {
    tmdb_id: string,
    title: string,
    lng: string,
    thumbnail: string | null,
}