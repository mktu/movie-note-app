import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { screen, userEvent } from "@storybook/test";

import { handlers } from "../../movie-note/pages/msw";
import Movie from "./Movie";

export default {
  title: "app/movie-note/New",
  component: Movie,
} as Meta<typeof Movie>;


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export const Default: StoryObj<typeof Movie> = {
  parameters: {
    msw: {
      handlers,
    },
  },
  args: {
    onSubmit: action("onSubmit"),
  },
  play: async () => {
    const searchInput = screen.getByTestId("search-title");

    await userEvent.type(searchInput, "termina", {
      delay: 100,
    });

    await sleep(3000);

    const submitButton = screen.getByTestId("option-0");

    userEvent.click(submitButton);
    await sleep(3000);
  }
}

