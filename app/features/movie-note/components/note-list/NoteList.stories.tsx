import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import NoteList from './NoteList';

export default {
    title: 'app/movie-note/NoteList',
    component: NoteList,
} as ComponentMeta<typeof NoteList>;

const Template: ComponentStory<typeof NoteList> = (args) => (
    <div className='w-[256px] overflow-x-hidden'>
        <NoteList {...args} />
    </div>
);

export const Default = Template.bind({});

Default.args = {
    onRemoveNote: action('onRemoveNote'),
    movieNoteList: [{
        tmdb_id: '1',
        title: 'test1',
        stars: 5,
        user_id: '1',
        admiration_date: '2020-10-21',
        thumbnail: '/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg',
        watch_state: 'watched',
        sort_index: 0
    }, {
        tmdb_id: '2',
        title: 'test2',
        stars: 5,
        user_id: '1',
        admiration_date: '2020-10-21',
        thumbnail: null,
        watch_state: 'watched',
        sort_index: 1
    }, {
        tmdb_id: '3',
        title: 'すごおおおおおおおおおおおおおおおおおおおおおおく長いタイトル',
        stars: 0,
        user_id: '1',
        admiration_date: '2020-10-21',
        thumbnail: null,
        watch_state: 'watched',
        sort_index: 2
    }]
}