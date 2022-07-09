import { useState } from "react";
import type { FC } from "react";
import Search from "./Search";
import useDetail from "../hooks/useTmdb/useDetail";

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
            {detail?.overview}
        </div>
    )
}

export default MovieNote