import { useCallback, useState } from "react";
import type { FC } from "react";
import useDetail from "../hooks/useTmdb/useDetail";
import MetaInfo from './meta'
import Imdb from "../features/imdb";
import Detail from "./detail";
import useCredits from "../hooks/useTmdb/useCredits";
import Note from "./note";
import { NewHeader } from "./header";
import type { AddMovieNote } from "@type-defs/frontend";
import Layout from './layout'

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
                        tmdbId: detail.id,
                        movieMemo: content ? content.get() : ''
                    })
                }} {...{ selected, setSelected }} />}
            movieInfo={detail && {
                detail: <Detail detail={detail} credits={credits} />,
                metaInfo: <MetaInfo genres={detail?.genres || []} />,
                imdb: <Imdb imdbId={detail?.imdb_id} />
            }}
            note={detail && <Note setContentGetter={setContentGetter} />}
        />
    )
}

export default MovieNote
