const searchBasePath = 'https://api.themoviedb.org/3/search/movie'
const detailBasePath = 'https://api.themoviedb.org/3/movie'

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
    status: string,
    overview?: string,
    poster_path?: string,
    backdrop_path?: string,
    genres: { name: string, id: number }[],
    homepage?: string,
    imdb_id?: string,

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
    getDetail = async (id: string) => {
        const searchParams = new URLSearchParams({
            api_key: this.apiKey,
            language: this.lng
        });
        const response = await fetch(`${detailBasePath}/${id}?${searchParams}`)
        const json = await response.json<MovieDetail>()
        return json
    }
}

export const setTmdbData = (context: any) => {
    return {
        apiKey: context.TMDB_API_KEY as string
    }
}