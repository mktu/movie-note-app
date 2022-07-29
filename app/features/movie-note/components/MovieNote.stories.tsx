import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { rest } from 'msw';
import { screen, userEvent, queryHelpers } from '@storybook/testing-library'

import MovieNote from './MovieNote';
import type { SearchResult } from '../utils/tmdb';
import type { ImdbRate } from '../features/imdb/types';

export default {
    title: 'app/movie-note/MovieNote',
    component: MovieNote,
} as ComponentMeta<typeof MovieNote>;

const Template: ComponentStory<typeof MovieNote> = (args) => <MovieNote {...args} />;

export const Default = Template.bind({});

Default.parameters = {
    msw: {
        handlers: [
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
                const result = {
                    id: '280',
                    title: 'ターミネーター2',
                    release_date: '1991-07-03',
                    status: 'Released',
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
                }
                return res(
                    ctx.status(200),
                    ctx.json(result),
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
            })
        ]
    },
}

Default.args = {
    selected: '',
    setSelected: action("selected")
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

Default.play = async () => {
    const searchInput = screen.getByPlaceholderText('search-title');

    await userEvent.type(searchInput, 'termina', {
        delay: 100,
    });

    await sleep(3000);

    const submitButton = screen.getAllByText('Example-1 (2020-02-02)');

    userEvent.click(submitButton[0]);
}