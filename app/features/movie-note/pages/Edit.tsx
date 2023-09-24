import { useCallback, useState } from 'react';

import { Summary } from '../components/detail';
import { EditHeader } from '../components/header';
import { MovieLayout } from '../components/layout';
import { Meta } from '~/features/movie';
import Note from '~/features/rte';
import Imdb, { ImdbRateLabel } from '../../imdb';

import type { FC } from "react";
import type { UpdateMovieNote, WatchState } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { ImdbRate } from '../../imdb/types';
import type { MovieNoteType } from '../server/db';
import WatchLogDialog from '../components/watch-log/WatchLogDialog';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

type Props = {
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    imdbRate: ImdbRate | null,
}

const Edit: FC<Props> = ({
    onSubmit,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
    imdbRate,
}) => {
    const [content, setContent] = useState<{ get: () => string }>()
    const [htmlConvertUtil, setHtmlConvertUtil] = useState<{ convert: () => Promise<string> }>()
    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const setHtmlConverter = useCallback((convert: () => Promise<string>) => {
        setHtmlConvertUtil({ convert })
    }, [])
    const detail = tmdbDetail
    const credits = tmdbCredits || null
    const stars = movieNoteDetail?.stars || 0
    const formattedWatchDate = movieNoteDetail?.admiration_date || ''
    const published = Boolean(movieNoteDetail?.published)
    const html = movieNoteDetail?.html || undefined
    const watchState = movieNoteDetail?.watch_state as WatchState
    const [openWatchLog, setOpenWatchLog] = useState(false)
    const { i18n } = useTranslation()
    return (
        <>
            <MovieLayout
                header={<EditHeader
                    detailPath={`/app/movies/${detail?.id}?lng=${i18n.language}`}
                    onOpenWatchLogDialog={() => { setOpenWatchLog(true) }}
                    error={error}
                    admirationDate={formattedWatchDate}
                    stars={stars}
                    image={detail?.poster_path || detail?.backdrop_path || ''}
                    title={movieNoteDetail?.title || ''}
                    watchState={movieNoteDetail?.watch_state as WatchState}
                    published={published}
                    onChangeState={(newState) => {
                        detail && onSubmit({
                            title: detail.title,
                            thumbnail: detail.poster_path || detail.backdrop_path || '',
                            tmdbId: detail.id,
                            imdbId: detail.imdb_id,
                            movieMemo: content?.get() || '',
                            admirationDate: formattedWatchDate || '',
                            stars: stars,
                            lng: detail.lng,
                            watchState: newState,
                            published,
                            html
                        })
                    }}
                    onPublish={async () => {
                        detail && onSubmit({
                            title: detail.title,
                            thumbnail: detail.poster_path || detail.backdrop_path || '',
                            tmdbId: detail.id,
                            imdbId: detail.imdb_id,
                            movieMemo: content?.get() || '',
                            admirationDate: formattedWatchDate || '',
                            stars: stars,
                            lng: detail.lng,
                            watchState,
                            published: true,
                            html: await htmlConvertUtil?.convert()
                        })
                    }}
                />}
                movieInfo={detail && {
                    detail: <Summary detail={detail} credits={credits} />,
                    metaInfo: <Meta genres={detail?.genres || []} />,
                    imdb: imdbRate ? <ImdbRateLabel imdbId={detail.imdb_id!} {...imdbRate} /> : <Imdb imdbId={detail?.imdb_id} />
                }}
                // RTEのonChangeハンドラでonSubmitする必要あり
                note={detail && <Note
                    setContentGetter={setContentGetter}
                    setHtmlConverter={setHtmlConverter}
                    init={movieNoteDetail?.memo}
                    onChange={(text) => {
                        onSubmit({
                            title: detail.title,
                            thumbnail: detail.poster_path || detail.backdrop_path || '',
                            tmdbId: detail.id,
                            imdbId: detail.imdb_id,
                            movieMemo: text,
                            admirationDate: formattedWatchDate,
                            stars,
                            lng: detail.lng,
                            watchState,
                            published,
                            html
                        }, 1000)
                    }}
                />}
            />
            {openWatchLog && (
                <WatchLogDialog
                    open={openWatchLog}
                    initAdmirationDate={formattedWatchDate}
                    initStars={stars}
                    onClose={() => {
                        setOpenWatchLog(false)
                    }}
                    onSave={(newAdmirationDate, newStars) => {
                        detail && onSubmit({
                            title: detail.title,
                            thumbnail: detail.poster_path || detail.backdrop_path || '',
                            tmdbId: detail.id,
                            imdbId: detail.imdb_id,
                            movieMemo: content?.get() || '',
                            admirationDate: format(new Date(newAdmirationDate), 'yyyy-MM-dd') || '',
                            stars: newStars,
                            lng: detail.lng,
                            watchState,
                            published,
                            html
                        })
                        setOpenWatchLog(false)
                    }}
                />
            )}
        </>
    )
}

export default Edit
