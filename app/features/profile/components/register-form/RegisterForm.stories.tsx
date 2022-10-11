import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Edit from './RegistrationForm';

export default {
    title: 'app/profiles/Register',
    component: Edit,
} as ComponentMeta<typeof Edit>;

const Template: ComponentStory<typeof Edit> = (args) => <Edit {...args} />;

export const Default = Template.bind({});

Default.args = {
};