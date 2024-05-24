import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Switch from "./Switch";

const Wrapper = () => {
  const [enabled, setEnabled] = useState(false);
  return <Switch {...{ enabled, setEnabled }} label="テスト有効" />;
};

export default {
  title: "Common/Switch",
  component: Wrapper,
} as Meta<typeof Wrapper>;

export const Primary: StoryObj<typeof Wrapper> = {
}
