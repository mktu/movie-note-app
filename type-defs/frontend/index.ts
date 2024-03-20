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
    hasPublicNote?: boolean,
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

export type User = {
    authId: string;
    comment: string | null;
    createdAt: string;
    id: string;
    image: string | null;
    name: string;
}

export type PublicNote = {
    createdAt: string,
    note: string;
    public: boolean;
    summary: string;
    tmdbId: string;
    updatedAt: string | null;
    userId: string;
    viewId: string;
    coverImage: string | null;
}

export type AddPublicNote = {
    summary: string,
    note: string,
    public: boolean,
    tmdbId: string,
    coverImageFile?: File,
    useDefaultTopImage?: boolean
}

export type UpdateMovieNote = AddMovieNote