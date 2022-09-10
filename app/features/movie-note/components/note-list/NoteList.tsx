import type { FC } from "react";
import MenuVertical from '~/components/icons/MenuVertical'
import { IconButton } from '~/components/buttons'
import type { MovieNoteListViewItem } from "@type-defs/backend";
import NoteListItem from "./NoteListItem";

type Props = {
    movieNoteList: MovieNoteListViewItem[],
}

const NoteList: FC<Props> = ({
    movieNoteList,
}) => {
    return (
        <div>
            <div className='flex items-center p-2'>
                <span>Notes</span>
                <div className="ml-auto">
                    <IconButton name='menu'><MenuVertical className='mr-1 h-5 w-5 stroke-text-main' /></IconButton>
                </div>
            </div>
            <div className='flex flex-col gap-1 p-2'>{movieNoteList.map(v => (
                <NoteListItem key={v.title} movieNoteListViewItem={v} />
            ))}</div>
        </div>
    )
}

export default NoteList