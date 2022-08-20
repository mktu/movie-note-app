import { useState } from "react";
import type { FC } from "react";
import Search from "../search-title";
import useDetail from "../../hooks/useTmdb/useDetail";
import MetaInfo from '../meta'
import Imdb from "../../features/imdb";
import Detail from "../detail";
import { Transition } from "@headlessui/react";
import useCredits from "../../hooks/useTmdb/useCredits";
import AddNoteAction from "./note/AddNoteAction";
import Note from "./note/Note";

const MovieNote: FC = () => {
    const [selected, setSelectedBase] = useState('')
    const { requestDetail, detail } = useDetail()
    const { requestCredits, credits } = useCredits()
    const [showNote, setShowNote] = useState(false)
    const setSelected = async (id: string) => {
        setSelectedBase(id)
        await requestDetail(id)
        await requestCredits(id)
    }
    return (
        <div className='w-full p-5'>
            <div className='flex w-full items-center'>
                <Search {...{ selected, setSelected }} />
            </div>
            <Transition
                className='flex w-full flex-col gap-2'
                show={Boolean(detail)}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className='flex w-full items-center'>
                    <MetaInfo genres={detail?.genres || []} />
                    <Imdb className='ml-auto' imdbId={detail?.imdb_id} />
                </div>
                <div className='flex w-full items-center'>
                    <Detail detail={detail} credits={credits} />
                </div>
                <div className='rounded-lg border border-dashed p-6'>
                    <div className='min-h-[256px]'>
                        <Note />
                    </div>
                </div>
            </Transition>
        </div>
    )
}

export default MovieNote