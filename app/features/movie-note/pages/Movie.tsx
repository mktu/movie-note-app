import { useState } from 'react';

import Imdb from '../features/imdb';
import useCredits from '../hooks/useTmdb/useCredits';
import useDetail from '../hooks/useTmdb/useDetail';
import Detail from '../components/detail';
import { NewHeader } from '../components/header';
import Layout from '../components/layout';
import MetaInfo from '../components/meta';

import type { FC } from "react";
import type { AddMovieNote } from "@type-defs/frontend";
import type { Credits, TmdbDetail } from '../utils/tmdb';

type Props = {
    onSubmit: (note: AddMovieNote) => void,
    error?: string,
    tmdbDetail?: TmdbDetail
    tmdbCredits?: Credits,
}

const Movie: FC<Props> = ({
    onSubmit,
    error,
    tmdbDetail: initDetail,
    tmdbCredits: initCredits
}) => {
    const [selected, setSelectedBase] = useState('')
    const [initialSelected, setInitialSelected] = useState(initDetail?.title || '')
    const { requestDetail, detail: apiDetail, resetDetail } = useDetail()
    const { requestCredits, credits: apiCredits, resetCredit } = useCredits()
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
        <Layout
            header={<NewHeader
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
                detail: <Detail detail={detail} credits={credits} />,
                metaInfo: <MetaInfo genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
        />
    )
}

export default Movie
