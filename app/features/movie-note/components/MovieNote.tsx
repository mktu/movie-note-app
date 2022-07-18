import { useState } from "react";
import type { FC } from "react";
import Search from "./search-title";
import useDetail from "../hooks/useTmdb/useDetail";
import MetaInfo from './meta'
import Imdb from "../features/imdb";

const MovieNote: FC = () => {
    const [selected, setSelectedBase] = useState('')
    const { requestDetail, detail } = useDetail()
    const setSelected = async (id: string) => {
        setSelectedBase(id)
        await requestDetail(id)
    }
    return (
        <div className='w-full p-5'>
            <div className='flex w-full items-center'>
                <Search {...{ selected, setSelected }} />
            </div>
            <div className='flex w-full items-center'>
                <MetaInfo movieDetail={detail || undefined} />
                <Imdb className='ml-auto' imdbId={detail?.imdb_id} />
            </div>
        </div>
    )
}

export default MovieNote