import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import WatchLog from "./WatchLog";

export default {
  title: "app/movie-note/Review",
  component: WatchLog,
} as Meta<typeof WatchLog>;


export const Default: StoryObj<typeof WatchLog> = {
  args: {
    setAdmirationDate: action("admirationDate"),
    setStars: action("stars"),
  }
}