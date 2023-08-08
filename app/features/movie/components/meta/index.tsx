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
        <div className={clsx('flex min-h-[64px] items-center', className)}>
            {genres.length > 0 && (
                <>
                    <div className='my-1 px-2 text-text-label'>
                        <Genres genres={genres.map(v => ({ tmdbId: String(v.id), name: v.name }))} />
                    </div>
                </>
            )}

        </div>
    );
};