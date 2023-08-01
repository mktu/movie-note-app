import { useState } from 'react';

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

type Props = {
    onSubmit: (note: AddMovieNote) => void,
    error?: string,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
    trailers: Video[]
}

const Movie: FC<Props> = ({
    onSubmit,
    error,
    tmdbDetail: initDetail,
    tmdbCredits: initCredits,
    trailers
}) => {
    const [selected, setSelectedBase] = useState('')
    const [initialSelected, setInitialSelected] = useState(initDetail?.title || '')
    const { requestDetail, detail: apiDetail, resetDetail } = useTmdbDetail()
    const { requestCredits, credits: apiCredits, resetCredit } = useTmdbCredits()
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
    return (
        <MovieLayout
            header={<MovieHeader
                initialSelected={initialSelected}
                error={error}
                canSave={Boolean(detail)}
                onReselect={() => { setInitialSelected('') }}
                onClickSave={(watchState) => {
                    detail && onSubmit({
                        title: detail.title,
                        thumbnail: detail.poster_path || detail.backdrop_path || '',
                        tmdbId: detail.id,
                        movieMemo: '',
                        admirationDate: '',
                        stars: 0,
                        imdbId: detail.imdb_id,
                        lng: detail.lng,
                        watchState
                    })
                }} {...{ selected, setSelected }} />}
            movieInfo={detail && {
                detail: <Detail
                    detail={detail}
                    credits={credits}
                    trailers={trailers}
                />,
                metaInfo: <Meta genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
        />
    )
}

export default Movie
