import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from '.';

export default {
    title: 'features/rte/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

const Blocks = {
    normal: { label: 'Normal' },
    h1: { label: 'Heading 1' },
    h2: { label: 'Heading 2' },
    h3: { label: 'Heading 3' }
}

Default.args = {
    onSelect(selected) {
        console.log(selected)
    },
    menuItems: Blocks
};


export const Disabled = Template.bind({});

Disabled.args = {
    menuItems: Blocks
};