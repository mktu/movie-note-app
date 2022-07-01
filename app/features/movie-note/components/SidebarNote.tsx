import type { FC } from "react";
import NoteIcon from '~/components/icons/Note'
import MenuVertical from '~/components/icons/MenuVertical'
import AddFill from '~/components/icons/AddFill'
import { IconButton } from '~/components/buttons'

const SidebarNote: FC = () => {
    return (
        <div>
            <div className='flex items-center p-2 text-xl'>
                <NoteIcon className='mr-2 h-6 w-6 stroke-text-main' />
                <span>Notes</span>
                <div className="ml-auto">
                    <IconButton><MenuVertical className='mr-1 h-5 w-5 stroke-text-main' /></IconButton>
                    <IconButton><AddFill className='h-5 w-5 fill-text-main' /></IconButton>
                </div>
            </div>
        </div>
    )
}

export default SidebarNote