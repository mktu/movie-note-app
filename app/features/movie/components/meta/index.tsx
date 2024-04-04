import clsx from 'clsx';
import type { FC } from 'react'
import type { TmdbDetail } from '~/features/tmdb';
import Genres from './Genres';

type Props = {
    genres: TmdbDetail['genres'],
    className?: string
}

export const Meta: FC<Props> = ({ genres, className }) => {
    return (
        <div className={clsx('flex items-center md:min-h-[64px]', className)}>
            {genres.length > 0 && (
                <>
                    <div className='text-text-label md:my-1 md:px-2'>
                        <Genres genres={genres.map(v => ({ tmdbId: String(v.id), name: v.name }))} />
                    </div>
                </>
            )}

        </div>
    );
};