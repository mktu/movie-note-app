import type { FC } from 'react';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Check from '~/components/icons/Check';
import Stars from '~/components/icons/Stars';
import Image from '~/components/Image';
import NavigatorContext from '~/providers/navigator/Context';

import { TmdbmageBasePath } from '@utils/constants';

import { useMovieNoteKvDisabled } from '../../store/localstorage/movieNoteKvDisabled';
import NoteListMenu from './NoteListMenu';
import RemoveNoteDialog from './RemoveNoteDialog';

import type { MovieListItemType } from '../../server/db';
import type { WatchState } from '@type-defs/frontend';
const imageBasePath = `${TmdbmageBasePath}/w200`

type Props = {
    movieNoteListViewItem: MovieListItemType,
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
    const { t } = useTranslation('common')
    const to = isMovieNoteKvDisabled ? `/app/notes/${movieNoteListViewItem.tmdb_id}?disableKv=true` : `/app/notes/${movieNoteListViewItem.tmdb_id}`
    const watchedState = movieNoteListViewItem.watch_state as WatchState
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
                                <div className='flex items-center gap-2'>
                                    {watchedState === 'watched' ? (
                                        <>
                                            <Check className='h-5 w-5 fill-green-500' />
                                            <span className='text-green-600'>{t('watched')}</span>
                                        </>
                                    ) : watchedState === 'lookforward' ? (
                                        <>
                                            <Stars className='h-5 w-5 fill-yellow-500' />
                                            <span className='text-yellow-600'>{t('lookforward')}</span>
                                        </>
                                    ) : (
                                        <>
                                            ---
                                        </>
                                    )}
                                </div>
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