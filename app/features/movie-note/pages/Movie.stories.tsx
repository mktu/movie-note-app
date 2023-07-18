import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { screen, userEvent } from '@storybook/testing-library';

import { handlers } from './msw';
import Movie from './Movie';

export default {
    title: 'app/movie-note/New',
    component: Movie,
} as ComponentMeta<typeof Movie>;

const Template: ComponentStory<typeof Movie> = (args) => <Movie {...args} />;

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