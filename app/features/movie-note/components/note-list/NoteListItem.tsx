import type { FC } from 'react';
import { useContext, useState } from 'react';
import Star from '~/components/icons/Star';
import NavigatorContext from '~/providers/navigator/Context';

import { TmdbmageBasePath } from '@utils/constants';

import Image from '../detail/Image';
import NoteListMenu from './NoteListMenu';
import RemoveNoteDialog from './RemoveNoteDialog';

import type { MovieNoteListViewItem } from '@type-defs/backend';
import { useMovieNoteKvDisabled } from '../../store/localstorage/movieNoteKvDisabled';

const imageBasePath = `${TmdbmageBasePath}/w200`

type Props = {
    movieNoteListViewItem: MovieNoteListViewItem,
    onRemoveNote: (noteId: string) => void
}

const NoteListItem: FC<Props> = ({
    movieNoteListViewItem,
    onRemoveNote
}) => {
    const { navigator: Navigator } = useContext(NavigatorContext)
    const path = movieNoteListViewItem.thumbnail ? `${imageBasePath}${movieNoteListViewItem.thumbnail}` : undefined
    const [deleting, setDeleting] = useState(false)
    const { isMovieNoteKvDisabled } = useMovieNoteKvDisabled()
    const to = isMovieNoteKvDisabled ? `/app/notes/${movieNoteListViewItem.tmdb_id}?disableKv=true` : `/app/notes/${movieNoteListViewItem.tmdb_id}`
    return (
        <>
            {deleting && (<RemoveNoteDialog title={movieNoteListViewItem.title || ''} onClose={() => {
                setDeleting(false)
            }} open={deleting} onRemove={() => {
                onRemoveNote(movieNoteListViewItem.tmdb_id)
            }} />)}
            <div className='flex w-full items-center'>
                <Navigator className='flex w-full items-center overflow-x-hidden text-text-main hover:bg-surface-hover' to={to} >
                    <Image className='overflow-hidden rounded' width={32} height={48}
                        src={path} alt={movieNoteListViewItem.title || ''} />
                    <div className='flex w-full flex-1 items-center overflow-hidden'>
                        <div className='ml-2 block w-full overflow-hidden'>
                            <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm'>{movieNoteListViewItem.title}</div>
                            <div className='flex w-full items-center text-xs'>
                                {movieNoteListViewItem.stars > 0 && (
                                    <>
                                        <Star className={`h-4 w-4 ${movieNoteListViewItem.stars ? 'fill-yellow-300' : 'fill-gray-200'}`} />
                                        {movieNoteListViewItem.stars}
                                        <div className='mx-1' />
                                    </>
                                )}
                                <div>{movieNoteListViewItem.admiration_date || '--'}</div>
                            </div>
                        </div>

                    </div>
                </Navigator >
                <div className='ml-auto flex items-center'>
                    <NoteListMenu onDelete={(e) => {
                        e.stopPropagation()
                        setDeleting(true)
                    }} />
                </div>
            </div>
        </>
    );
};

export default NoteListItem;