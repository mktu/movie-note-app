import { useState } from "react";
import type { FC } from "react";
import Search from "./search-title";
import useDetail from "../hooks/useTmdb/useDetail";
import MetaInfo from './meta'
import useImdb from "../hooks/useImdb";

const MovieNote: FC = () => {
    const [selected, setSelectedBase] = useState('')
    const { requestDetail, detail } = useDetail()
    const { rateInfo } = useImdb(detail?.imdb_id)
    const setSelected = async (id: string) => {
        setSelectedBase(id)
        await requestDetail(id)
    }
    return (
        <div className='w-full p-5'>
            <div className='flex w-full items-center'>
                <Search {...{ selected, setSelected }} />
            </div>
            <div>
                {detail && (<MetaInfo movieDetail={detail} />)}
                {rateInfo && <div>{rateInfo.rate}</div>}
            </div>
        </div>
    )
}

export default MovieNote