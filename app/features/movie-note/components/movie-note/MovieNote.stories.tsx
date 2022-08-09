import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { rest } from 'msw';
import { screen, userEvent } from '@storybook/testing-library'
import { detail, credits } from '~/features/movie-note/components/detail/mocks'

import MovieNote from './MovieNote';
import type { SearchResult } from '../../utils/tmdb';
import type { ImdbRate } from '../../features/imdb/types';

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
    const searchInput = screen.getByTestId('search-title');

    await userEvent.type(searchInput, 'termina', {
        delay: 100,
    });

    await sleep(3000);

    const submitButton = screen.getByTestId('option-0');

    userEvent.click(submitButton);
    await sleep(3000);
}