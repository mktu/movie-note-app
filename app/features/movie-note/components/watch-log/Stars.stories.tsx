import type { Meta, StoryObj } from "@storybook/react";

import Stars from "./Stars";

export default {
  title: "app/movie-note/Review/Stars",
  component: Stars,
} as Meta<typeof Stars>;

export const Default: StoryObj<typeof Stars> = {
  args: {
    stars: 4,
  }
}