import { rest } from 'msw';
import { credits, detail } from '~/features/movie/components/detail/mocks';

import type { ImdbRate } from "../../imdb/types"
import type { SearchResult } from "~/features/tmdb"
export { detail, credits }
export const handlers = [
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        const result: SearchResult = {
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
        return res(
            ctx.status(200),
            ctx.json(result),
        )
    }),
    rest.get('https://api.themoviedb.org/3/movie/:detail', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(detail),
        )
    }),
    rest.get('http://localhost:6006/api/imdb/:imdbId', (req, res, ctx) => {
        const result: ImdbRate = {
            rate: '8.0',
            denominator: '10',
            parameter: '50K'
        }
        return res(
            ctx.status(200),
            ctx.json(result),
        )
    }),
    rest.get('https://api.themoviedb.org/3/movie/:movieId/credits', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(credits),
        )
    }),
]