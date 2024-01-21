import React, { useContext } from "react";
import type { useMovieNote } from "../../hooks/useMovieNote";

export type MovieNoteContextType = ReturnType<typeof useMovieNote>

const context = React.createContext<MovieNoteContextType>({
    detail: undefined,
    credits: null,
    stars: 0,
    formattedWatchDate: '',
    hasPublicNote: false,
    published: false,
    watchState: 'lookforward',
    setHtmlConverter: () => { },
    setContentGetter: () => { },
    htmlConvertUtil: {
        convert: async () => '',
    },
    submitNote: async () => { },
    showPreview: () => { },
    getTemplates: async () => [],
    title: '',
    imagePath: '',
    detailPath: '',
    previewPath: '',
    error: '',
    lastUpdated: '',
    initialNote: undefined,
    editing: false,
    setEditing: function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
    },
    unsavedNoteInfo: null
});

export const useMovieNoteContext = () => useContext(context)

export default context;