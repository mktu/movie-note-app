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

export type UpdateMovieNote = AddMovieNote