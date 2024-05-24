import type { Meta, StoryObj } from "@storybook/react";

import Note from ".";

export default {
  title: "features/rte/index",
  component: Note,
} as Meta<typeof Note>;

export const Default: StoryObj<typeof Note> = {
  args: {
    setContentGetter: () => { },
  }
}