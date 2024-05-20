import type { AppLoadContext } from "@remix-run/cloudflare"

const searchBasePath = 'https://api.themoviedb.org/3/search/movie'
const searchActorPath = 'https://api.themoviedb.org/3/search/person'
const detailBasePath = 'https://api.themoviedb.org/3/movie'
const trendPath = 'https://api.themoviedb.org/3/trending'
const personPath = 'https://api.themoviedb.org/3/person'
const movieBasePath = (id: string) => `https://api.themoviedb.org/3/movie/${id}/videos`
const creditsBasePath = (id: string) => `https://api.themoviedb.org/3/movie/${id}/credits`
const movieCreditPath = (id: string) => `https://api.themoviedb.org/3/person/${id}/movie_credits`

export type SearchMovieResult = {
    page: number,
    results: {
        poster_path?: string,
        title: string,
        id: string,
        release_date: string
    }[]
}

export type ActorKnownFor = {
    backdrop_path: string,
    id: string,
    title: string,
    overview: string,
    poster_path: string,
}

export type SearchActorResult = {
    page: number,
    results: {
        adult: boolean,
        gender: number,
        id: string,
        known_for_department: string,
        name: string,
        original_name: string,
        profile_path: string,
        known_for: ActorKnownFor[]
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

export type Actor = {
    id: string,
    biography: string,
    birthday: string,
    name: string,
    place_of_birth: string,
    profile_path: string
}

export type MovieCredits = {
    id: string,
    cast: {
        backdrop_path: string,
        id: string,
        title: string,
        poster_path: string,
        release_date: string,
        character: string
    }[]
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
        const json = await response.json<SearchMovieResult>()
        return json
    }
    searchActor = async (query: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            query,
            page: '1',
            language: this.lng
        });
        const response = await fetch(`${searchActorPath}?${searchParams}`)
        const json = await response.json<SearchActorResult>()
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
    getActor = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${personPath}/${id}?${searchParams}`)
        const json = await response.json<Omit<Actor, 'lng'>>()
        console.log('bio-', json.biography)
        return { ...json, id }
    }
    getMovieCredit = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${movieCreditPath(id)}?${searchParams}`)
        const json = await response.json<Omit<MovieCredits, 'lng'>>()
        return { ...json, lng: this.lng, id }
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

export const setTmdbData = (context: AppLoadContext) => {
    return {
        apiKey: context.cloudflare.env.TMDB_API_KEY
    }
}