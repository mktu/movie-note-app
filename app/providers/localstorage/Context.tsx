import React from "react";
import * as localstorage from "@utils/localstorage";

export type LocalstorageType = typeof localstorage
const context = React.createContext<LocalstorageType>(localstorage);

export default context;