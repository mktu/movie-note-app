import { useCallback, useState } from 'react';

import Detail from '../components/detail';
import { EditHeader } from '../components/header';
import Layout from '../components/layout';
import MetaInfo from '../components/meta';
import Note from '../components/note';
import Review from '../components/review';
import Imdb, { ImdbRateLabel } from '../features/imdb';
import { useReview } from '../hooks/useMovie';
import { useMovieNoteChangeMonitor } from '../hooks/useMovieNoteChangeMonitor';

import type { FC } from "react";
import type { UpdateMovieNote } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '../utils/tmdb';
import type { ImdbRate } from '../features/imdb/types';
import type { MovieNoteType } from '../server/db';

type Props = {
    onSubmit: (note: UpdateMovieNote) => void,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    imdbRate: ImdbRate | null
}

const Edit: FC<Props> = ({
    onSubmit,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
    imdbRate
}) => {
    const [content, setContent] = useState<{ get: () => string }>()
    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const detail = tmdbDetail
    const credits = tmdbCredits || null
    const { setStars, setAdmirationDate, stars, formattedWatchDate, admirationDate } = useReview(movieNoteDetail?.stars, movieNoteDetail?.admiration_date)
    const { unblock, setDirty } = useMovieNoteChangeMonitor()
    return (
        <Layout
            header={<EditHeader
                error={error}
                title={movieNoteDetail?.title || ''}
                canSave={Boolean(detail)}
                onClickSave={() => {
                    unblock()
                    detail && onSubmit({
                        title: detail.title,
                        thumbnail: detail.poster_path || detail.backdrop_path || '',
                        tmdbId: detail.id,
                        imdbId: detail.imdb_id,
                        movieMemo: content ? content.get() : '',
                        admirationDate: formattedWatchDate || '',
                        stars,
                        lng: detail.lng
                    })
                }} />}
            movieInfo={detail && {
                detail: <Detail detail={detail} credits={credits} />,
                metaInfo: <MetaInfo genres={detail?.genres || []} />,
                imdb: imdbRate ? <ImdbRateLabel imdbId={detail.imdb_id!} {...imdbRate} /> : <Imdb imdbId={detail?.imdb_id} />
            }}
            note={detail && <Note
                setContentGetter={setContentGetter}
                init={movieNoteDetail?.memo}
                monitorCurrentState={(state) => {
                    if (movieNoteDetail?.memo) {
                        setDirty(state !== movieNoteDetail?.memo)
                    } else {
                        setDirty(Boolean(state))
                    }
                }}
            />}
            review={detail && <Review admirationDate={admirationDate} stars={stars} setAdmirationDate={setAdmirationDate} setStars={setStars} />}
        />
    )
}

export default Edit
