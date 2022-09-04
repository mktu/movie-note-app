import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import { handlers } from './msw';
import New from './New';

export default {
    title: 'app/movie-note/New',
    component: New,
} as ComponentMeta<typeof New>;

const Template: ComponentStory<typeof New> = (args) => <New {...args} />;

export const Default = Template.bind({});

Default.parameters = {
    msw: {
        handlers
    },
}

Default.args = {
    onSubmit: action("onSubmit"),
};

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

Default.play = async () => {
    const searchInput = screen.getByTestId('search-title');

    await userEvent.type(searchInput, 'termina', {
        delay: 100,
    });

    await sleep(3000);

    const submitButton = screen.getByTestId('option-0');

    userEvent.click(submitButton);
    await sleep(3000);
}