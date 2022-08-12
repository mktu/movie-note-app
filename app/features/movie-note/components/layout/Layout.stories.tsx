import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from '.';

export default {
    title: 'app/movie-note/Layout',
    component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: (
        <div>content</div>
    ),
};