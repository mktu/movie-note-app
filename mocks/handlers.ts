// src/mocks/handlers.js
import { rest } from 'msw'
import type { SearchResult } from '~/features/movie-note/utils/tmdb'

export const handlers = [
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        const result: SearchResult = {
            page: 1,
            results: [{
                title: 'my-test',
                id: '555',
                release_date: '2020-02-02'
            }]
        }
        return res(
            ctx.status(200),
            ctx.json(result),
        )
    })
]