import type { Meta, StoryObj } from "@storybook/react";

import { MovieHeader } from "./";

export default {
  title: "app/movie/Header",
  component: MovieHeader,
} as Meta<typeof MovieHeader>;

export const Enabled: StoryObj<typeof MovieHeader> = {};

export const Disabled: StoryObj<typeof MovieHeader> = {};

