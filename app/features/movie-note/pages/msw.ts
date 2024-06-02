import { HttpResponse, http } from 'msw';
import { credits, detail } from '~/features/movie/components/detail/mocks';

import type { ImdbRate } from "../../imdb/types"
import type { SearchMovieResult } from "~/features/tmdb"
export { detail, credits }
export const handlers = [
    http.get('https://api.themoviedb.org/3/search/movie', () => {
        const result: SearchMovieResult = {
            page: 1,
            results: [{
                title: 'Example-1',
                id: '555',
                release_date: '2020-02-02',
                poster_path: '/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg'
            },
            {
                title: 'Example-2',
                id: '556',
                release_date: '2021-02-02',
                poster_path: '/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg'
            }]
        }
        return HttpResponse.json(result)
    }),
    http.get('https://api.themoviedb.org/3/movie/:detail', () => {
        return HttpResponse.json(detail)
    }),
    http.get('http://localhost:6006/api/imdb/:imdbId', () => {
        const result: ImdbRate = {
            rate: '8.0',
            denominator: '10',
            parameter: '50K'
        }
        return HttpResponse.json(result)
    }),
    http.get('https://api.themoviedb.org/3/movie/:movieId/credits', () => {
        return HttpResponse.json(credits)
    }),
]