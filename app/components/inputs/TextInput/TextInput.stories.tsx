import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '.';

export default {
    title: 'Common/Input/Input',
    component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

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

export const Labeled = Template.bind({});

Labeled.args = {
    label: 'Input any values',
    paddings: 'px-4 py-1',
};

export const Errored = Template.bind({});

Errored.args = {
    label: 'Input any values',
    paddings: 'px-4 py-1',
    error: 'Value required!'
};