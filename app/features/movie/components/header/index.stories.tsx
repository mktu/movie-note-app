import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { MovieHeader } from './';

export default {
    title: 'app/movie/Header',
    component: MovieHeader,
} as ComponentMeta<typeof MovieHeader>;

const Template: ComponentStory<typeof MovieHeader> = (args) => <MovieHeader {...args} />;

export const Enabled = Template.bind({});
Enabled.args = {
}

export const Disabled = Template.bind({});

Disabled.args = {
}