import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Detail from './Container';
import { detail, credits } from './mocks'

export default {
    title: 'app/movie-note/Detail',
    component: Detail,
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const Default = Template.bind({});

Default.args = {
    detail,
    credits
};

export const NoImage = Template.bind({});

NoImage.args = {
    detail: {
        ...detail,
        poster_path: '',
        backdrop_path: ''
    },
    credits
};