import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { handlers, detail, credits } from './msw';
import Edit from './Edit';

export default {
    title: 'app/movie-note/Edit',
    component: Edit,
} as ComponentMeta<typeof Edit>;

const Template: ComponentStory<typeof Edit> = (args) => <Edit {...args} />;

export const Default = Template.bind({});

Default.parameters = {
    msw: {
        handlers
    },
}


Default.args = {
    onSubmit: action("onSubmit"),
    movieNoteDetail: {
        user_id: 'test',
        tmdb_id: detail.id,
        lng: 'ja',
        stars: 6,
        thumbnail: detail.poster_path || detail.backdrop_path || null,
        title: detail.title,
        admiration_date: '2020-02-02',
        imdb_id: 'a',
        memo: null,
        created_at: '2020-02-02',
        updated_at: '2020-02-02',
        watch_state: null
    },
    tmdbDetail: detail,
    tmdbCredits: credits
};