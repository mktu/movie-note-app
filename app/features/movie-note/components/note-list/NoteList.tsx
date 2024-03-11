import type { FC } from "react";
import { useEffect } from "react";
import { useMovieNoteList } from '../../store/data/movieNoteList';
import NoteListItem from './NoteListItem';
import SortMenu from './SortMenu';

import type { MovieListType } from "../../server/db";
import FilterMenu from "./FilterMenu";

type Props = {
    movieNoteList: MovieListType,
    onRemoveNote: (noteId: string) => void
}

const NoteList: FC<Props> = ({
    movieNoteList: initMovieNoteList,
    onRemoveNote
}) => {
    const { updateSortType, updateFilterType, movieNoteList, filterType, setMovieNoteList } = useMovieNoteList()
    useEffect(() => {
        setMovieNoteList(initMovieNoteList)
    }, [setMovieNoteList, initMovieNoteList])
    return (
        <div>
            <div className='flex items-center p-2'>
                <div className='text-text-main'>Notes</div>
                <div className='ml-auto flex items-center gap-3'>
                    <FilterMenu onFilter={updateFilterType} filterType={filterType} />
                    <SortMenu onSort={updateSortType} />
                </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{movieNoteList.map(v => (
                <NoteListItem onRemoveNote={onRemoveNote} key={v.title} movieNoteListViewItem={v} />
            ))}</div>
        </div>
    )
}

export default NoteList