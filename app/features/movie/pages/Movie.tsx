import { useCallback, useState } from 'react';

import Imdb from '~/features/imdb';
import { useTmdbCredits, useTmdbDetail } from '~/features/tmdb';
import { Detail } from '../components/detail';
import { MovieHeader } from '../components';
import { MovieLayout } from '../components/layout';
import { Meta } from '../components/meta';

import type { FC } from "react";
import type { AddMovieNote } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '~/features/tmdb';
import type { Video } from '~/features/tmdb/utils';
import type { MovieNoteType } from '~/features/movie-note/server/db';
import { useNavigatorContext } from '~/providers/navigator/Context';
import Footer from '../components/footer';

type Props = {
    onSubmit: (note: AddMovieNote) => void,
    error?: string,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    trailers: Video[],
    note: MovieNoteType | null
}

const Movie: FC<Props> = ({
    onSubmit,
    error,
    tmdbDetail: initDetail,
    tmdbCredits: initCredits,
    trailers,
    note
}) => {
    const [selected, setSelectedBase] = useState('')
    const [initialSelected, setInitialSelected] = useState(initDetail?.title || '')
    const { requestDetail, detail: apiDetail, resetDetail } = useTmdbDetail()
    const { requestCredits, credits: apiCredits, resetCredit } = useTmdbCredits()
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const setSelected = async (id: string) => {
        if (id) {
            setSelectedBase(id)
            await requestDetail(id)
            await requestCredits(id)
        } else {
            setSelectedBase('')
            resetDetail()
            resetCredit()
        }
    }

    const detail = apiDetail || initDetail || null
    const credits = apiCredits || initCredits || null
    const onNavigateNote = useCallback(() => {
        if (note) {
            detail && navigate(`/app/notes/${detail.id}`)
            return
        }
        detail && onSubmit({
            title: detail.title,
            thumbnail: detail.poster_path || detail.backdrop_path || '',
            tmdbId: detail.id,
            movieMemo: '',
            admirationDate: '',
            stars: 0,
            published: false,
            hasPublicNote: false,
            imdbId: detail.imdb_id,
            lng: detail.lng
        })
    }, [detail, navigate, note, onSubmit])
    return (
        <MovieLayout
            header={<MovieHeader
                hasNote={Boolean(note)}
                initialSelected={initialSelected}
                error={error}
                canSave={Boolean(detail)}
                onReselect={() => { setInitialSelected('') }}
                onNavigateNote={onNavigateNote} {...{ selected, setSelected }} />}
            movieInfo={detail && {
                detail: <Detail
                    detail={detail}
                    credits={credits}
                    trailers={trailers}
                />,
                metaInfo: <Meta genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
            footer={<Footer
                onNavigateNote={onNavigateNote}
                hasNote={!!note}
            />}
        />
    )
}

export default Movie
