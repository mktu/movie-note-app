import type { Meta, StoryObj } from "@storybook/react";

import Detail from "./Detail";
import { detail, credits } from "./mocks";

export default {
  title: "app/movie/Detail",
  component: Detail,
} as Meta<typeof Detail>;


export const Default: StoryObj<typeof Detail> = {
  args: {
    detail,
    credits,
  }
};

export const NoImage: StoryObj<typeof Detail> = {
  args: {
    detail: {
      ...detail,
      poster_path: "",
      backdrop_path: "",
    },
    credits,
  }
};
