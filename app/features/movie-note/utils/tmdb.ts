const searchBasePath = 'https://api.themoviedb.org/3/search/movie'
const detailBasePath = 'https://api.themoviedb.org/3/movie'
const creditsBasePath = (id: string) => `https://api.themoviedb.org/3/movie/${id}/credits`

export type SearchResult = {
    page: number,
    results: {
        poster_path?: string,
        title: string,
        id: string,
        release_date: string
    }[]
}

export type MovieDetail = {
    id: string,
    title: string,
    release_date: string,
    lng: string
    status: string,
    overview?: string,
    poster_path?: string,
    backdrop_path?: string,
    genres: { name: string, id: number }[],
    homepage?: string,
    imdb_id?: string,
}

export type Cast = {
    id: number,
    name: string,
    popularity: number,
    profile_path: string | null,
    cast_id: number,
    character: string,
    credit_id: string,
}

export type Crew = {
    id: number,
    name: string,
    profile_path: string | null,
    department: string,
    job: string,
    credit_id: string,
}

export type Credits = {
    id: number,
    cast: Cast[],
    crew: Crew[]
}

type Lng = 'ja' | 'en'

export default class Tmdb {
    apiKey: string = ''
    lng: Lng = 'ja'
    constructor(apiKey: string, lng: Lng) {
        this.apiKey = apiKey
        this.lng = lng
    }
    search = async (query: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            query,
            page: '1',
            language: this.lng
        });
        const response = await fetch(`${searchBasePath}?${searchParams}`)
        const json = await response.json<SearchResult>()
        return json
    }
    getCredits = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${creditsBasePath(id)}?${searchParams}`)
        const json = await response.json<Credits>()
        return json
    }
    getDetail = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${detailBasePath}/${id}?${searchParams}`)
        const json = await response.json<Omit<MovieDetail, 'lng'>>()
        return { ...json, lng: this.lng }
    }
}

export const setTmdbData = (context: any) => {
    return {
        apiKey: context.TMDB_API_KEY as string
    }
}