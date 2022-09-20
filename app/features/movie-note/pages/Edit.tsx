import { useCallback, useState } from 'react';

import Imdb from '../features/imdb';
import { useReview } from '../hooks/useMovie';
import Detail from '../components/detail';
import { EditHeader } from '../components/header';
import Layout from '../components/layout';
import MetaInfo from '../components/meta';
import Note from '../components/note';
import Review from '../components/review';

import type { FC } from "react";
import type { UpdateMovieNote } from "@type-defs/frontend";
import type { MovieNoteDetail } from '@type-defs/backend';
import type { Credits, TmdbDetail } from '../utils/tmdb';

type Props = {
    onSubmit: (note: UpdateMovieNote) => void,
    error?: string,
    movieNoteDetail?: MovieNoteDetail,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits
}

const Edit: FC<Props> = ({
    onSubmit,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits
}) => {
    const [content, setContent] = useState<{ get: () => string }>()
    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const detail = tmdbDetail
    const credits = tmdbCredits || null
    const { setStars, setAdmirationDate, stars, formattedWatchDate, admirationDate } = useReview(movieNoteDetail?.stars, movieNoteDetail?.admiration_date)
    return (
        <Layout
            header={<EditHeader
                error={error}
                title={movieNoteDetail?.title || ''}
                canSave={Boolean(detail)}
                onClickSave={() => {
                    detail && onSubmit({
                        title: detail.title,
                        thumbnail: detail.poster_path || detail.backdrop_path || '',
                        tmdbId: detail.id,
                        movieMemo: content ? content.get() : '',
                        admirationDate: formattedWatchDate || '',
                        stars,
                        lng: detail.lng
                    })
                }} />}
            movieInfo={detail && {
                detail: <Detail detail={detail} credits={credits} />,
                metaInfo: <MetaInfo genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
            note={detail && <Note setContentGetter={setContentGetter} init={movieNoteDetail?.memo} />}
            review={detail && <Review admirationDate={admirationDate} stars={stars} setAdmirationDate={setAdmirationDate} setStars={setStars} />}
        />
    )
}

export default Edit
