import type { StoryObj, Meta } from "@storybook/react";
import { within, userEvent } from "@storybook/test";
import { Page } from "./Page";

export default {
  title: "Example/Page",
  component: Page,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as Meta<typeof Page>;

export const LoggedOut: StoryObj<typeof Page> = {}

export const LoggedIn: StoryObj<typeof Page> = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole("button", { name: /Log in/i });
    await userEvent.click(loginButton);
  }
}
