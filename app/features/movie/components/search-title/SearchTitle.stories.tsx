import type { Meta, StoryObj } from "@storybook/react";
import { HttpResponse, http } from "msw";

import SearchTitle from ".";
import type { SearchMovieResult } from "~/features/tmdb";

export default {
  title: "app/movie-note/SearchTitle",
  component: SearchTitle,
} as Meta<typeof SearchTitle>;

export const Default: StoryObj<typeof SearchTitle> = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.themoviedb.org/3/search/movie", () => {
          const result: SearchMovieResult = {
            page: 1,
            results: [
              {
                title: "Example-1",
                id: "555",
                release_date: "2020-02-02",
                poster_path: "/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg",
              },
              {
                title: "Example-2",
                id: "556",
                release_date: "2021-02-02",
                poster_path: "/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg",
              },
            ],
          };
          return HttpResponse.json(result);
        }),
      ],
    },
  }
}