import React, { useContext } from "react";
import type { useMovieNotePreview } from "../../hooks/useMovieNotePreview";

export type NotePreviewContextType = ReturnType<typeof useMovieNotePreview>

const context = React.createContext<NotePreviewContextType>({
    html: '',
    summary: '',
    viewId: '',
    isPublic: false,
    hasPublicNote: false,
    setSummary: () => { },
    onSubmit: () => { },
    setIsPublic: () => { },
    tmdbImageUrl: undefined,
    coverImage: null,
    onSelectDefaultImage: () => { },
    onChangeCoverImage: () => { },
    imgError: ""
});

export const useNotePreviewContext = () => useContext(context)

export default context;