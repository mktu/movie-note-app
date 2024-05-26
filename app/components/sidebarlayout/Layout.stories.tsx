import type { Meta, StoryObj } from "@storybook/react";

import Layout from "./Container";

export default {
  title: "Common/SidebarLayout",
  component: Layout,
} as Meta<typeof Layout>;


export const Default: StoryObj<typeof Layout> = {
  args: {
    children: <div>content</div>,
    initialSidebarWidth: 250,
    userMenu: <div>usermenu</div>,
    noteList: [],
  }
};
