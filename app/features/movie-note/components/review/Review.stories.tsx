import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Review from './Review';

export default {
    title: 'app/movie-note/Review',
    component: Review,
} as ComponentMeta<typeof Review>;

const Template: ComponentStory<typeof Review> = (args) => <Review {...args} />;

export const Default = Template.bind({});

Default.args = {
    setAdmirationDate: action('admirationDate'),
    setStars: action('stars')
}