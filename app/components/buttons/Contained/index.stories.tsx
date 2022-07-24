import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Contained from '.';

export default {
    title: 'Common/Button/Contained',
    component: Contained,
} as ComponentMeta<typeof Contained>;

const Template: ComponentStory<typeof Contained> = (args) => <Contained {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    children: 'Button',
    paddings: 'px-4 py-2'
};