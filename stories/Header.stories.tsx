import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./Header";

export default {
  title: "Example/Header",
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Header>;

export const LoggedIn: StoryObj<typeof Header> = {
  args: {
    user: {
      name: "Jane Doe",
    }
  }
}
export const LoggedOut: StoryObj<typeof Header> = {}
