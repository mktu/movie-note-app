import clsx from 'clsx';
import type { FC } from 'react'
import type { MovieDetail } from '../../utils/tmdb';
import Genres from './Genres';

type Props = {
    movieDetail: Pick<MovieDetail, 'genres'> | null,
    className?: string
}

const Index: FC<Props> = ({ movieDetail, className }) => {
    return (
        <div className={clsx('flex min-h-[64px] items-center', className)}>
            {movieDetail && (
                <>
                    <div className='my-1 px-2 text-text-label'>
                        <Genres genres={movieDetail ? movieDetail.genres.map(v => ({ tmdbId: String(v.id), name: v.name })) : []} />
                    </div>
                </>
            )}

        </div>
    );
};

export default Index;