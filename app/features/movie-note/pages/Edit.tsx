import { useCallback, useState } from 'react';

import { Summary } from '../components/detail';
import { EditHeader } from '../components/header';
import { MovieLayout } from '../components/layout';
import { Meta } from '~/features/movie';
import Note from '~/features/rte';
import Review from '../components/review';
import Imdb, { ImdbRateLabel } from '../../imdb';
import { useReview } from '../hooks/useMovie';
import { useMovieNoteChangeMonitor } from '../hooks/useMovieNoteChangeMonitor';

import type { FC } from "react";
import type { UpdateMovieNote, WatchState } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { ImdbRate } from '../../imdb/types';
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
    const { unblock, setDirty, checkDirty } = useMovieNoteChangeMonitor()
    return (
        <MovieLayout
            header={<EditHeader
                error={error}
                title={movieNoteDetail?.title || ''}
                watchState={movieNoteDetail?.watch_state as WatchState}
                canSave={Boolean(detail)}
                onClickSave={(watchState) => {
                    unblock()
                    detail && onSubmit({
                        title: detail.title,
                        thumbnail: detail.poster_path || detail.backdrop_path || '',
                        tmdbId: detail.id,
                        imdbId: detail.imdb_id,
                        movieMemo: content ? content.get() : '',
                        admirationDate: formattedWatchDate || '',
                        stars,
                        lng: detail.lng,
                        watchState
                    })
                }} />}
            movieInfo={detail && {
                detail: <Summary detail={detail} credits={credits} />,
                metaInfo: <Meta genres={detail?.genres || []} />,
                imdb: imdbRate ? <ImdbRateLabel imdbId={detail.imdb_id!} {...imdbRate} /> : <Imdb imdbId={detail?.imdb_id} />
            }}
            note={detail && <Note
                setContentGetter={setContentGetter}
                init={movieNoteDetail?.memo}
                monitorCurrentState={(state) => {
                    if (movieNoteDetail?.memo) {
                        setDirty(state !== movieNoteDetail?.memo)
                    } else {
                        setDirty(before => {
                            return before || checkDirty(state)
                        })
                    }
                }}
            />}
            review={detail && <Review admirationDate={admirationDate} stars={stars} setAdmirationDate={setAdmirationDate} setStars={setStars} />}
        />
    )
}

export default Edit
