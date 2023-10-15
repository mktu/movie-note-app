import React, { useContext } from "react";
import type { useMovieNote } from "../../hooks/useMovieNote";

export type MovieNoteContextType = ReturnType<typeof useMovieNote>

const context = React.createContext<MovieNoteContextType>({
    detail: undefined,
    credits: null,
    stars: 0,
    formattedWatchDate: '',
    published: false,
    watchState: 'lookforward',
    setHtmlConverter: () => { },
    setContentGetter: () => { },
    htmlConvertUtil: {
        convert: async () => '',
    },
    submitNote: () => { },
    showPreview: () => { },
    title: '',
    imagePath: '',
    detailPath: '',
    previewPath: '',
    error: ''
});

export const useMovieNoteContext = () => useContext(context)

export default context;