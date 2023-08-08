import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Stars from './Stars';

export default {
    title: 'app/movie-note/Review/Stars',
    component: Stars,
} as ComponentMeta<typeof Stars>;

const Template: ComponentStory<typeof Stars> = (args) => <Stars {...args} />;

export const Default = Template.bind({});

Default.args = {
    stars: 4
}