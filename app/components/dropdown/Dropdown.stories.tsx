import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Dropdown from '.';

export default {
    title: 'Common/Dropdown',
    component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
    onSelect(selected) {
        console.log(selected)
    },
};


export const Disabled = Template.bind({});

Disabled.args = {
};