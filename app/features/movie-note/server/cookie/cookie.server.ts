import cookie from 'cookie'
import { MOVIE_DETAIL_TYPE } from '../../utils/constants';
import type { MovieDetailType } from '../../type-defs';

// should move to freature or sidebar?
export const getMovieNoteType = (request: Request) => {
    const cookies = cookie.parse(request.headers.get("Cookie") || '') || {}
    const movieNoteType = cookies[MOVIE_DETAIL_TYPE] ? (cookies[MOVIE_DETAIL_TYPE]) as MovieDetailType : 'detail'
    return {
        movieNoteType
    }
}


