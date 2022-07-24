import type { ComponentStory, ComponentMeta } from '@storybook/react';

import TextInput from '.';

export default {
    title: 'Common/Input/TextInput',
    component: TextInput,
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});

Default.args = {
    placeholder: 'Input any values',
    paddings: 'px-4 py-1'
};


export const Disabled = Template.bind({});

Disabled.args = {
    placeholder: 'Input any values',
    paddings: 'px-4 py-1',
    disabled: true
};