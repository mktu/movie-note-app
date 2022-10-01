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
    admiration_date: string | null,
}

export type MovieNoteListViewItem = {
    tmdb_id: string,
    user_id: string,
    stars: number,
    thumbnail?: string,
    title?: string,
    admiration_date?: string
}

export type MovieNoteDetail = {
    user_id: string,
    tmdb_id: string,
    updated_at?: string,
    lng: string,
    stars: number,
    thumbnail?: string,
    title?: string,
    memo?: string,
    admiration_date?: string,
    imdb_id: string | null
}

export type MovieInfoTable = {
    tmdb_id: string,
    title: string,
    lng: string,
    thumbnail: string | null,
    imdb_id: string | null
}