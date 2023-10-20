import type { Meta, StoryFn } from '@storybook/react';

import Dropdown from '.';

export default {
    title: 'features/rte/Dropdown',
    component: Dropdown,
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

const Blocks = {
    normal: { label: 'Normal' },
    h1: { label: 'Heading 1' },
    h2: { label: 'Heading 2' },
    h3: { label: 'Heading 3' }
}

Default.args = {
    onSelect(selected) {
    },
    defaultSelected: 'Normal',
    menuItems: Blocks
};


export const Disabled = Template.bind({});

Disabled.args = {
    menuItems: Blocks
};