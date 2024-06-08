import { useState } from 'react';

import { EditHeader } from '../components/header';
import { MovieLayout } from '../components/layout';
import Note from '~/features/rte';

import type { FC } from "react";
import type { UpdateMovieNote } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { MovieNoteType } from '../server/db';
import WatchLogDialog from '../components/watch-log/WatchLogDialog';
import { useMovieNote } from '../hooks/useMovieNote';
import { MovieNoteContext } from '../context/movie-note';
import { useTranslation } from 'react-i18next';
import { saveMovieNoteIfNotExists } from '../utils/localstorage';
import Footer from '../components/footer';

type Props = {
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void,
    hasPublicNote: boolean,
    published: boolean,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    submitState: Parameters<typeof useMovieNote>[0]['submitState']
}

const Edit: FC<Props> = ({
    onSubmit,
    hasPublicNote,
    published,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
    submitState
}) => {
    const contextValue = useMovieNote({
        hasPublicNote,
        published,
        error,
        movieNoteDetail,
        tmdbDetail,
        tmdbCredits,
        onSubmit,
        submitState
    })
    const {
        detail,
        initialNote,
        setHtmlConverter,
        setContentGetter,
        getTemplates,
        setEditing
    } = contextValue
    const [openWatchLog, setOpenWatchLog] = useState(false)
    const { t } = useTranslation('common')
    return (
        <MovieNoteContext.Provider value={contextValue}>
            <MovieLayout
                header={<EditHeader
                    onOpenWatchLogDialog={() => { setOpenWatchLog(true) }}
                />}
                note={detail && <Note
                    setContentGetter={setContentGetter}
                    setHtmlConverter={setHtmlConverter}
                    templateGetter={getTemplates}
                    placeholder={`${t('note-place-holder')}...✍️`}
                    init={initialNote}
                    onChange={(note) => {
                        movieNoteDetail?.tmdb_id && saveMovieNoteIfNotExists(movieNoteDetail?.tmdb_id, note)
                        setEditing(true)
                    }} // save note to localstorage
                />}
                footer={
                    detail && <Footer />
                }
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
