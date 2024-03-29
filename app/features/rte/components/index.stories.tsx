import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Note from '.';

export default {
    title: 'features/rte/index',
    component: Note,
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = (args) => <Note {...args} />;

export const Default = Template.bind({});

Default.args = {
    setContentGetter: () => {
    }
}