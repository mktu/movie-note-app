import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { MovieDetail } from '../../utils/tmdb';
import Genres from './Genres';

type Props = {
    movieDetail: MovieDetail
}

const Index: FC<Props> = ({ movieDetail }) => {
    const { t } = useTranslation('common')
    return (
        <div className=''>
            <div id='release-date' className='my-1 px-2 text-text-label'>{movieDetail.release_date} {t('release')}</div>
            <div>
                <Genres genres={movieDetail.genres.map(v => ({ tmdbId: String(v.id), name: v.name }))} />
            </div>
        </div>
    );
};

export default Index;