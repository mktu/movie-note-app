import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';

import WatchLog from './WatchLog';

export default {
    title: 'app/movie-note/Review',
    component: WatchLog,
} as ComponentMeta<typeof WatchLog>;

const Template: ComponentStory<typeof WatchLog> = (args) => <WatchLog {...args} />;

export const Default = Template.bind({});

Default.args = {
    setAdmirationDate: action('admirationDate'),
    setStars: action('stars')
}