import React, { useContext } from "react";
import { Tmdb } from "~/features/tmdb";

const context = React.createContext<Tmdb>(new Tmdb('', 'en'));

export const useTmdbContext = () => useContext(context)

export default context;