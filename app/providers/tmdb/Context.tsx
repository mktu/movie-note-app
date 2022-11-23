import React, { useContext } from "react";
import tmdb from "~/features/movie-note/utils/tmdb";

const context = React.createContext<tmdb>(new tmdb('', 'en'));

export const useTmdbContext = () => useContext(context)

export default context;