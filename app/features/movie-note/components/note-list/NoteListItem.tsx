import type { FC } from 'react';
import { useContext } from 'react'
import { TmdbmageBasePath } from '@utils/constants';

import type { MovieNoteListViewItem } from '@type-defs/backend';
import Image from '../detail/Image';
import Star from '~/components/icons/Star'
import NavigatorContext from '~/providers/navigator/Context'

const imageBasePath = `${TmdbmageBasePath}/w200`

type Props = {
    movieNoteListViewItem: MovieNoteListViewItem
}

const NoteListItem: FC<Props> = ({
    movieNoteListViewItem
}) => {
    const { navigator: Navigator } = useContext(NavigatorContext)
    return (
        <Navigator className='flex w-full items-center overflow-x-hidden text-text-main hover:bg-surface-hover' to='/' >
            <Image className='overflow-hidden rounded' width={32} height={48}
                src={`${imageBasePath}${movieNoteListViewItem.thumbnail}`} alt={movieNoteListViewItem.title || ''} />
            <div className='flex w-full flex-1 items-center overflow-hidden'>
                <div className='ml-2 block overflow-hidden'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap text-sm'>{movieNoteListViewItem.title}</div>
                    <div className='text-xs'>{movieNoteListViewItem.admiration_date || '--'}</div>
                </div>
                <div className='ml-auto flex items-center'>
                    {movieNoteListViewItem.stars > 0 && (
                        <>
                            <Star className={`mr-1 h-5 w-5 ${movieNoteListViewItem.stars ? 'fill-yellow-300' : 'fill-gray-200'}`} />
                            {movieNoteListViewItem.stars}
                        </>
                    )}
                </div>
            </div>
        </Navigator >
    );
};

export default NoteListItem;