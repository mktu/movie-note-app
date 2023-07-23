import type { FC } from 'react'
import { PictureAndLines, SingleLine } from '~/components/skeltons';
import { MovieLayout } from '../components/layout';
import Review from '../components/watch-log';
import { useMovieDetailType } from '../store/cookie/movieDetailType';

const Placeholder: FC = () => {
    const { movieDetailType } = useMovieDetailType()
    return (
        <MovieLayout
            header={(<SingleLine className='w-full' height={32} />)}
            movieInfo={{
                detail: movieDetailType === 'detail' ?
                    (<PictureAndLines className='w-full px-4' />) : (<SingleLine className='w-full' height={32} />),
                metaInfo: <div className='h-[24px]' />,
                imdb: <div />
            }}
            review={(
                <Review setAdmirationDate={() => {
                    //
                }} setStars={() => {
                    //
                }} />
            )}
        />
    );
};

export default Placeholder;