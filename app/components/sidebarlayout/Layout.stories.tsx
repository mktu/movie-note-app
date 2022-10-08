import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './Container';

export default {
    title: 'Common/SidebarLayout',
    component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Default = Template.bind({});

Default.args = {
    children: (
        <div>content</div>
    ),
    initialSidebarWidth: 250,
    userMenu: (<div>usermenu</div>),
    noteList: []
};