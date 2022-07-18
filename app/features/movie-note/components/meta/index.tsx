import clsx from 'clsx';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { MovieDetail } from '../../utils/tmdb';
import Genres from './Genres';

type Props = {
    movieDetail?: MovieDetail,
    className?: string
}

const Index: FC<Props> = ({ movieDetail, className }) => {
    const { t } = useTranslation('common')
    return (
        <div className={clsx('min-h-[64px]', className)}>
            {movieDetail && (
                <>
                    <div id='release-date' className='my-1 px-2 text-text-label'>{movieDetail.release_date} {t('release')}</div>
                    <div>
                        <Genres genres={movieDetail ? movieDetail.genres.map(v => ({ tmdbId: String(v.id), name: v.name })) : []} />
                    </div>
                </>
            )}

        </div>
    );
};

export default Index;