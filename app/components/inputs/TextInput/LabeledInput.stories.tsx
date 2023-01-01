import type { ComponentStory, ComponentMeta } from '@storybook/react';

import LabeledInput from './LabeledInput';

export default {
    title: 'Common/Input/LabeledInput',
    component: LabeledInput,
} as ComponentMeta<typeof LabeledInput>;

const Template: ComponentStory<typeof LabeledInput> = (args) => <LabeledInput {...args} />;

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