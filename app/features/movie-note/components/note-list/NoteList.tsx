import type { FC } from "react";
import { useMovieNoteList } from '../../hooks/useMovieNoteList';
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
    const { selectSortType, selectFilterType, movieNoteList, sortType, filterType } = useMovieNoteList(initMovieNoteList)
    return (
        <div>
            <div className='flex items-center p-2'>
                <div className='text-text-main'>Notes</div>
                <div className='ml-auto flex items-center gap-3'>
                    <FilterMenu onFilter={selectFilterType} filterType={filterType} />
                    <SortMenu onSort={selectSortType} sortType={sortType} />
                </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{movieNoteList.map(v => (
                <NoteListItem onRemoveNote={onRemoveNote} key={v.title} movieNoteListViewItem={v} />
            ))}</div>
        </div>
    )
}

export default NoteList