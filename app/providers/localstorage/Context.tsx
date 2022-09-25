import React from "react";
import type useLocalstorage from './useLocalstorage';
import * as localstorage from "@utils/localstorage";

export type LocalstorageType = ReturnType<typeof useLocalstorage>
const context = React.createContext<LocalstorageType>({
    ...localstorage,
    saveSidebarWidth: () => { },
    getSidebarWidth: () => 0,
    localstorageLoaded: false
});

export default context;