import type { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewHeader } from '.';

export default {
    title: 'app/movie-note/Header',
    component: NewHeader,
} as ComponentMeta<typeof NewHeader>;

const Template: ComponentStory<typeof NewHeader> = (args) => <NewHeader {...args} />;

export const Enabled = Template.bind({});
Enabled.args = {
    canSave: true
}

export const Disabled = Template.bind({});

Disabled.args = {
    canSave: false
}