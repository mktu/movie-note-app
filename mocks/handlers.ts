// src/mocks/handlers.js
import { rest } from 'msw'
import type { SearchResult, TmdbDetail } from '~/features/movie-note/utils/tmdb'
// handle for e2e (not for storybook)
export const handlers = [
    rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
        const result: SearchResult = {
            page: 1,
            results: [{
                title: 'ターミネーター4',
                id: '555',
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
        return res(
            ctx.status(200),
            ctx.json({
                id: '556',
                title: 'ターミネーター4',
                release_date: '2009-05-20',
                status: 'Released',
                lng: 'ja',
                overview: '未来からの抹殺兵器ターミネーターを破壊し、近未来で恐ろしい戦争が起こる事を知ってしまったサラ・コナー。カイルとの子供ジョンは母親から常にその戦争の話や戦いへの備えの話を聞かされていた。サラは周囲から変人扱いされ精神病院へ収容されジョンは親戚の家で暮らしていた。ある日ジョンの前に執拗にジョンを狙う不審な警官が現る。軌道を逸した警官の行動は明らかにジョンを殺害しようとしていた。殺されるその寸前、見知らぬ屈強な男が現れジョンを救う。彼は自らをターミネーターでありジョンを守るべく再プログラムされ未来から送り込まれたと告げる。ジョン',
                poster_path: '/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg',
                backdrop_path: '/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg',
                genres: [
                    {
                        "id": 28,
                        "name": "アクション"
                    },
                    {
                        "id": 53,
                        "name": "スリラー"
                    },
                    {
                        "id": 878,
                        "name": "サイエンスフィクション"
                    }
                ],
                homepage: '',
                imdb_id: 'tt0103064',
            } as TmdbDetail),
        )
    }),
]