import { useState } from 'react';

import { EditHeader } from '../components/header';
import { MovieLayout } from '../components/layout';
import { Meta } from '~/features/movie';
import Note from '~/features/rte';

import type { FC } from "react";
import type { UpdateMovieNote } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { MovieNoteType } from '../server/db';
import WatchLogDialog from '../components/watch-log/WatchLogDialog';
import { useMovieNote } from '../hooks/useMovieNote';
import { MovieNoteContext } from '../context/movie-note';

type Props = {
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
}

const Edit: FC<Props> = ({
    onSubmit,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
}) => {
    const contextValue = useMovieNote({
        error,
        movieNoteDetail,
        tmdbDetail,
        tmdbCredits,
        onSubmit,
    })
    const {
        detail,
        setHtmlConverter,
        setContentGetter,
        submitNote
    } = contextValue
    const [openWatchLog, setOpenWatchLog] = useState(false)
    return (
        <MovieNoteContext.Provider value={contextValue}>
            <MovieLayout
                header={<EditHeader
                    onOpenWatchLogDialog={() => { setOpenWatchLog(true) }}
                />}
                movieInfo={detail && {
                    metaInfo: <Meta genres={detail?.genres || []} />,
                }}
                note={detail && <Note
                    setContentGetter={setContentGetter}
                    setHtmlConverter={setHtmlConverter}
                    init={movieNoteDetail?.memo}
                    onChange={(text) => {
                        submitNote({
                            newNote: text,
                            debounceTimeout: 1000
                        },)
                    }}
                />}
            />
            {openWatchLog && (
                <WatchLogDialog
                    open={openWatchLog}
                    onClose={() => {
                        setOpenWatchLog(false)
                    }}
                />
            )}
        </MovieNoteContext.Provider>
    )
}

export default Edit
