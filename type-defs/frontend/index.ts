export type AddMovieNote = {
    tmdbId: string,
    stars: number,
    title: string,
    lng: string,
    movieMemo: string,
    thumbnail: string,
    imdbId?: string,
    admirationDate: string
}

export type UpdateMovieNote = AddMovieNote