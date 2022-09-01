import type { FC } from "react";
import NoteIcon from '~/components/icons/Note'
import MenuVertical from '~/components/icons/MenuVertical'
import AddFill from '~/components/icons/AddFill'
import { IconButton } from '~/components/buttons'
import type { MovieNoteListViewItem } from "@type-defs/backend";
import NoteListItem from "./NoteListItem";

type Props = {
    movieNoteList: MovieNoteListViewItem[],
    onClickNewNote: () => void
}

const NoteList: FC<Props> = ({
    movieNoteList,
    onClickNewNote
}) => {
    return (
        <div>
            <div className='flex items-center p-2 text-xl'>
                <NoteIcon className='mr-2 h-6 w-6 stroke-text-main' />
                <span>Notes</span>
                <div className="ml-auto">
                    <IconButton name='menu'><MenuVertical className='mr-1 h-5 w-5 stroke-text-main' /></IconButton>
                    <IconButton
                        name='new-note'
                        onClick={onClickNewNote}
                    ><AddFill className='h-5 w-5 fill-text-main' /></IconButton>
                </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{movieNoteList.map(v => (
                <NoteListItem key={v.title} movieNoteListViewItem={v} />
            ))}</div>
        </div>
    )
}

export default NoteList