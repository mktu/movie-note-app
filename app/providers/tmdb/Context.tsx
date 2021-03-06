import React from "react";
import tmdb from "~/features/movie-note/utils/tmdb";

const context = React.createContext<tmdb>(new tmdb('', 'en'));

export default context;