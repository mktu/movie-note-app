// src/mocks/handlers.js
import { rest } from 'msw'
import type { SearchResult } from '~/features/tmdb'
import details from './details'
// handle for e2e (not for storybook)
export const handlers = [
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        const result: SearchResult = {
            page: 1,
            results: [{
                title: 'ターミネーター4',
                id: '534',
                release_date: '2009-05-20',
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
        const detail = req.params.detail as string
        return res(
            ctx.status(200),
            ctx.json(details[detail]),
        )
    }),
]