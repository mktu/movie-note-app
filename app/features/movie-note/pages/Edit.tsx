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

type Props = {
    onSubmit: (note: UpdateMovieNote, debounceTimeout?: number) => void,
    published: boolean,
    error?: string,
    movieNoteDetail?: MovieNoteType,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    onPublish: (previewHtml: string) => void
}

const Edit: FC<Props> = ({
    onSubmit,
    published,
    error,
    movieNoteDetail,
    tmdbDetail,
    tmdbCredits,
    onPublish
}) => {
    const contextValue = useMovieNote({
        published,
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
        getTemplates,
        submitNote,
    } = contextValue
    const [openWatchLog, setOpenWatchLog] = useState(false)
    const { t } = useTranslation('common')
    return (
        <MovieNoteContext.Provider value={contextValue}>
            <MovieLayout
                header={<EditHeader
                    onPublish={onPublish}
                    onOpenWatchLogDialog={() => { setOpenWatchLog(true) }}
                />}
                note={detail && <Note
                    setContentGetter={setContentGetter}
                    setHtmlConverter={setHtmlConverter}
                    templateGetter={getTemplates}
                    placeholder={`${t('note-place-holder')}...✍️`}
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
