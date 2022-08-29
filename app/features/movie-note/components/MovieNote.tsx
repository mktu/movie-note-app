import { useCallback, useState } from 'react';

import Imdb from '../features/imdb';
import { useReview } from '../hooks/useMovie';
import useCredits from '../hooks/useTmdb/useCredits';
import useDetail from '../hooks/useTmdb/useDetail';
import Detail from './detail';
import { NewHeader } from './header';
import Layout from './layout';
import MetaInfo from './meta';
import Note from './note';
import Review from './review';

import type { FC } from "react";
import type { AddMovieNote } from "@type-defs/frontend";

type Props = {
    onSubmit: (note: AddMovieNote) => void,
    error?: string
}

const MovieNote: FC<Props> = ({
    onSubmit,
    error
}) => {
    const [selected, setSelectedBase] = useState('')
    const [content, setContent] = useState<{ get: () => string }>()
    const setContentGetter = useCallback((getContent: () => string) => {
        setContent({ get: getContent })
    }, [])
    const { requestDetail, detail, resetDetail } = useDetail()
    const { requestCredits, credits, resetCredit } = useCredits()
    const { setStars, setAdmirationDate, stars, formattedWatchDate, admirationDate } = useReview()
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
    return (
        <Layout
            header={<NewHeader
                error={error}
                canSave={Boolean(detail)}
                onClickSave={() => {
                    detail && onSubmit({
                        title: detail.title,
                        thumbnail: detail.poster_path || detail.backdrop_path || '',
                        tmdbId: detail.id,
                        movieMemo: content ? content.get() : '',
                        admirationDate: formattedWatchDate || '',
                        stars,
                        lng: detail.lng
                    })
                }} {...{ selected, setSelected }} />}
            movieInfo={detail && {
                detail: <Detail detail={detail} credits={credits} />,
                metaInfo: <MetaInfo genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
            note={detail && <Note setContentGetter={setContentGetter} />}
            review={detail && <Review admirationDate={admirationDate} stars={stars} setAdmirationDate={setAdmirationDate} setStars={setStars} />}
        />
    )
}

export default MovieNote
