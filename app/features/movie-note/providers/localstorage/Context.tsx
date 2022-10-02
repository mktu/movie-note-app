import React from "react";
import type useLocalstorage from './useLocalstorage';

export type LocalstorageType = ReturnType<typeof useLocalstorage>
const context = React.createContext<LocalstorageType>({
    nonReactive: {
        getMovieNoteState: () => null,
        saveMovieNoteState: () => { },
        removeMovieNoteState: () => { }
    }
});

export default context;