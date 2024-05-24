import type { Meta, StoryObj } from "@storybook/react";

import Contained from ".";

export default {
  title: "Common/Button/Contained",
  component: Contained,
} as Meta<typeof Contained>;

type Story = StoryObj<typeof Contained>

export const Primary: Story = {
  args: {
    children: "Button",
    paddings: "px-4 py-2",
  }
}