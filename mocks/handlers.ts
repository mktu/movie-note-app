// src/mocks/handlers.js
import { HttpResponse, http } from 'msw'
import type { SearchMovieResult } from '~/features/tmdb'
import details from './details'
// handle for e2e (not for storybook)
export const handlers = [
    http.get('https://api.themoviedb.org/3/search/movie', () => {
        const result: SearchMovieResult = {
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
        return HttpResponse.json(result)
    }),
    http.get('https://api.themoviedb.org/3/movie/:detail', ({ params }) => {
        const detail = params.detail as string
        return HttpResponse.json(details[detail])
    }),
]