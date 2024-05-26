import type { Meta as MetaType, StoryObj } from "@storybook/react";

import { Meta } from ".";

export default {
  title: "app/movie-note/Meta",
  component: Meta,
} as MetaType<typeof Meta>;

const genres = [
  {
    id: 28,
    name: "アクション",
  },
  {
    id: 53,
    name: "スリラー",
  },
  {
    id: 878,
    name: "サイエンスフィクション",
  },
];

export const Default: StoryObj<typeof Meta> = {
  args: {
    genres: genres,
  }
}
