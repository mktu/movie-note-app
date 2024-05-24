import type { Meta, StoryObj } from "@storybook/react";

import Edit from "./RegistrationForm";

export default {
  title: "app/profiles/Register",
  component: Edit,
} as Meta<typeof Edit>;

export const Update: StoryObj<typeof Edit> = {
  args: {
    nickname: "test",
  }
}

export const New: StoryObj<typeof Edit> = {
  args: {
    singleColumn: true,
  }
}