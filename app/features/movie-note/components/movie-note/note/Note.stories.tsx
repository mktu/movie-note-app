import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Note from './Note';

export default {
    title: 'app/movie-note/Note',
    component: Note,
} as ComponentMeta<typeof Note>;

const Template: ComponentStory<typeof Note> = (args) => <Note {...args} />;

export const Default = Template.bind({});