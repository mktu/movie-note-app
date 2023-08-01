import { useCallback, useState } from 'react';

import { Summary } from '../components/detail';
import { EditHeader } from '../components/header';
import { MovieLayout } from '../components/layout';
import { DetailDialog, Meta } from '~/features/movie';
import Note from '~/features/rte';
import Imdb, { ImdbRateLabel } from '../../imdb';
import { useWatchLog } from '../hooks/useMovie';
import { useMovieNoteChangeMonitor } from '../hooks/useMovieNoteChangeMonitor';

import type { FC } from "react";
import type { UpdateMovieNote, WatchState } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { ImdbRate } from '../../imdb/types';
import type { MovieNoteType } from '../server/db';
import WatchLogDialog from '../components/watch-log/WatchLogDialog';
import { Video } from '~/features/tmdb/utils';

type Props = {
    onSubmit: (note: UpdateMovieNote) => void,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    imdbRate: ImdbRate | null,
    trailers: Video[]
}

const Edit: FC<Props> = ({
    onSubmit,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
    imdbRate,
    trailers
}) => {
    const [content, setContent] = useState<{ get: () => string }>()
    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const detail = tmdbDetail
    const credits = tmdbCredits || null
    const watchLogs = useWatchLog(movieNoteDetail?.stars, movieNoteDetail?.admiration_date)
    const { stars, formattedWatchDate, setAdmirationDate, setStars } = watchLogs
    const { unblock, setDirty, checkDirty } = useMovieNoteChangeMonitor()
    const [openDetailDialog, setOpenDetailDialog] = useState(false)
    const [openWatchLog, setOpenWatchLog] = useState(false)
    return (
        <>
            <MovieLayout
                header={<EditHeader
                    onOpenDetailDialog={() => { setOpenDetailDialog(true) }}
                    onOpenWatchLogDialog={() => { setOpenWatchLog(true) }}
                    error={error}
                    admirationDate={formattedWatchDate}
                    stars={stars}
                    image={detail?.poster_path || detail?.backdrop_path || ''}
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
            />
            {openDetailDialog && detail && (
                <DetailDialog
                    detail={detail}
                    credits={credits}
                    trailers={trailers}
                    onClose={() => { setOpenDetailDialog(false) }}
                    open={openDetailDialog}
                />
            )}
            {openWatchLog && (
                <WatchLogDialog
                    open={openWatchLog}
                    initAdmirationDate={formattedWatchDate}
                    initStars={stars}
                    onClose={() => {
                        setOpenWatchLog(false)
                    }}
                    onSave={(newAdmirationDate, newStars) => {
                        setStars(newStars)
                        setAdmirationDate(newAdmirationDate)
                        setOpenWatchLog(false)
                    }}
                />
            )}
        </>
    )
}

export default Edit
