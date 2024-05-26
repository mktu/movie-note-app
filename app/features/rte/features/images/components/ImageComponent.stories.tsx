import type { Meta, StoryObj } from "@storybook/react";

import ImageComponent from "./ImageComponent";

export default {
  title: "features/rte/Image",
  component: ImageComponent,
} as Meta<typeof ImageComponent>;

export const Default: StoryObj<typeof ImageComponent> = {
  args: {
    src: "https://image.tmdb.org/t/p/w300_and_h450_bestv2//3Vc8VSWzB5QyVkgTBhIBCKoptu.jpg",
    width: 300,
    height: 450,
    altText: "test",
  }
}