const searchBasePath = 'https://api.themoviedb.org/3/search/movie'
const detailBasePath = 'https://api.themoviedb.org/3/movie'
const trendPath = 'https://api.themoviedb.org/3/trending'
const movieBasePath = (id: string) => `https://api.themoviedb.org/3/movie/${id}/videos`
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

export type TmdbTrend = {
    poster_path?: string,
    title: string,
    overview?: string,
    id: string,
    release_date: string,
}

export type TmdbTrends = {
    page: number,
    results: TmdbTrend[]
}

export type TmdbLng = 'ja' | 'en'

export type TmdbDetail = {
    id: string,
    title: string,
    release_date: string,
    lng: TmdbLng
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

export type Video = {
    id: string,
    type: string,
    official: string,
    site: string,
    size: number,
    key: string
}

export type Videos = {
    id: number,
    results: Video[]
}

export default class Tmdb {
    apiKey = ''
    lng: TmdbLng = 'ja'
    constructor(apiKey: string, lng: TmdbLng) {
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
    getTrends = async () => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${trendPath}/movie/week?${searchParams}`)
        const json = await response.json<TmdbTrends>()
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
        const json = await response.json<Omit<TmdbDetail, 'lng'>>()
        return { ...json, lng: this.lng }
    }
    getVideos = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        })
        const response = await fetch(`${movieBasePath(id)}?${searchParams}`)
        const json = await response.json<Videos>()
        return json
    }
    getYoutubeTrailers = async (id: string) => {
        const res = await this.getVideos(id)
        return res.results.filter(v => v.type === 'Trailer' && v.site === 'YouTube')
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setTmdbData = (context: any) => {
    return {
        apiKey: context.TMDB_API_KEY as string
    }
}