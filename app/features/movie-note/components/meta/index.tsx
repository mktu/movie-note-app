import clsx from 'clsx';
import type { FC } from 'react'
import type { MovieDetail } from '../../utils/tmdb';
import Genres from './Genres';

type Props = {
    genres: MovieDetail['genres'],
    className?: string
}

const Index: FC<Props> = ({ genres, className }) => {
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

export default Index;