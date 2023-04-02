export type MovieDetailType = 'summary' | 'detail'
export type StoredMovieNote = {
    date: string,
    note: string,
    id: string
}
export type SortType =
    'updated-at-asc' |
    'updated-at-desc' |
    'created-at-asc' |
    'created-at-desc'

export type FilterType =
    'watched' |
    'lookforward' |
    'all'