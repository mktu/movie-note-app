export type WatchState = 'watched' | 'lookforward'
export type AddMovieNote = {
    tmdbId: string,
    stars: number,
    title: string,
    lng: string,
    movieMemo: string,
    thumbnail: string,
    imdbId?: string,
    admirationDate: string,
    watchState?: WatchState,
    published?: boolean,
    html?: string
}
export type AddNoteTemplate = {
    name: string,
    template: string,
    html: string,
}

export type NoteTemplate = {
    id: number,
    name: string;
    public: boolean | null;
    template: string | null;
    html: string | null
}

export type PublicNote = {
    summary: string,
    note: string,
    public: boolean,
    tmdbId: string,
    viewId: string
}

export type AddPublicNote = {
    summary: string,
    note: string,
    public: boolean,
    tmdbId: string
}

export type UpdateMovieNote = AddMovieNote