import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Meta from '.';

export default {
    title: 'app/movie-note/Meta',
    component: Meta,
} as ComponentMeta<typeof Meta>;

const Template: ComponentStory<typeof Meta> = (args) => <Meta {...args} />;

export const Default = Template.bind({});

const genres = [
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
]
Default.args = {
    genres: genres
};