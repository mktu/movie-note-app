import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import NoteList from "./NoteList";

export default {
  title: "app/movie-note/NoteList",
  component: NoteList,
} as Meta<typeof NoteList>;

export const Default: StoryObj<typeof NoteList> = {
  args: {
    onRemoveNote: action("onRemoveNote"),
    movieNoteList: [
      {
        tmdb_id: "1",
        title: "test1",
        stars: 5,
        user_id: "1",
        admiration_date: "2020-10-21",
        thumbnail: "/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg",
        watch_state: "watched",
        sort_index: 0,
      },
      {
        tmdb_id: "2",
        title: "test2",
        stars: 5,
        user_id: "1",
        admiration_date: "2020-10-21",
        thumbnail: null,
        watch_state: "watched",
        sort_index: 1,
      },
      {
        tmdb_id: "3",
        title: "すごおおおおおおおおおおおおおおおおおおおおおおく長いタイトル",
        stars: 0,
        user_id: "1",
        admiration_date: "2020-10-21",
        thumbnail: null,
        watch_state: "watched",
        sort_index: 2,
      },
    ],
  }

}