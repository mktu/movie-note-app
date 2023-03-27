import type { FC } from "react";
import { useMovieNoteList } from '../../hooks/useMovieNoteList';
import NoteListItem from './NoteListItem';
import SortMenu from './SortMenu';

import type { MovieListType } from "../../server/db";

type Props = {
    movieNoteList: MovieListType,
    onRemoveNote: (noteId: string) => void
}

const NoteList: FC<Props> = ({
    movieNoteList: initMovieNoteList,
    onRemoveNote
}) => {
    const { selectSortType, movieNoteList, sortType } = useMovieNoteList(initMovieNoteList)
    return (
        <div>
            <div className='flex items-center p-2'>
                <div className='text-text-main'>Notes</div>

                <div className='ml-auto flex items-center'>
                    <SortMenu onSort={selectSortType} sortType={sortType} />
                </div>
                {/* maybe this should be filter option */}
                {/* <div className="ml-auto">
                    <IconButton name='menu'><MenuVertical className='mr-1 h-5 w-5 stroke-text-main' /></IconButton>
                </div> */}
            </div>
            <div className='flex flex-col gap-1 p-2'>{movieNoteList.map(v => (
                <NoteListItem onRemoveNote={onRemoveNote} key={v.title} movieNoteListViewItem={v} />
            ))}</div>
        </div>
    )
}

export default NoteList