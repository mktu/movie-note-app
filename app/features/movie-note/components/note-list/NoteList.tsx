import type { FC } from "react";
import type { MovieNoteListViewItem } from "@type-defs/backend";
import NoteListItem from "./NoteListItem";

type Props = {
    movieNoteList: MovieNoteListViewItem[],
    onRemoveNote: (noteId: string) => void
}

const NoteList: FC<Props> = ({
    movieNoteList,
    onRemoveNote
}) => {
    return (
        <div>
            <div className='flex items-center p-2'>
                <span>Notes</span>
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