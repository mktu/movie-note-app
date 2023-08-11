import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { rest } from 'msw';

import SearchTitle from '.';
import type { SearchMovieResult } from '~/features/tmdb';

export default {
    title: 'app/movie-note/SearchTitle',
    component: SearchTitle,
} as ComponentMeta<typeof SearchTitle>;

const Template: ComponentStory<typeof SearchTitle> = (args) => <SearchTitle {...args} />;

export const Default = Template.bind({});

Default.parameters = {
    msw: {
        handlers: [
            rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
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
                return res(
                    ctx.status(200),
                    ctx.json(result),
                )
            }),
        ]
    },
}

Default.args = {
    selected: '',
    setSelected: action("selected")
};