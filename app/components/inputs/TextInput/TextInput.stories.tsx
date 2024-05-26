import type { Meta, StoryObj } from "@storybook/react";

import Input from ".";

export default {
  title: "Common/Input/Input",
  component: Input,
} as Meta<typeof Input>;

export const Default: StoryObj<typeof Input> = {
  args: {
    placeholder: "Input any values",
    paddings: "px-4 py-1",
  }
};

export const Disabled: StoryObj<typeof Input> = {
  args: {
    placeholder: "Input any values",
    paddings: "px-4 py-1",
    disabled: true,
  }
};

export const Labeled: StoryObj<typeof Input> = {
  args: {
    label: "Input any values",
    paddings: "px-4 py-1",
  }
};

export const Errored: StoryObj<typeof Input> = {
  args: {
    label: "Input any values",
    paddings: "px-4 py-1",
    error: "Value required!",
  }
};
