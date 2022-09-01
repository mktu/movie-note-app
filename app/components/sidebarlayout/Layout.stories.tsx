import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from './Layout';
import Sidebar from './sidebar'

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
    sidebar: (
        <Sidebar
            staticLinks={<div>links</div>}
            userMenu={<div>usermenu</div>}
            noteList={[]} />
    )
};