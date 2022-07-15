import { useState } from "react";
import type { FC } from "react";
import Search from "./search";
import useDetail from "../hooks/useTmdb/useDetail";
import MetaInfo from './meta'

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
            <div>
                {detail && (<MetaInfo movieDetail={detail} />)}
            </div>
        </div>
    )
}

export default MovieNote