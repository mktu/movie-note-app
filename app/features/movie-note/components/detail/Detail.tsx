import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { Credits as CreditsType, MovieDetail } from '../../utils/tmdb';
import Image from './Image'
import Credits from './Credits'

const imageBasePath = `${TmdbmageBasePath}/w600_and_h900_bestv2`

type Props = {
    detail: MovieDetail | null,
    credits: CreditsType | null
}

const Detail: FC<Props> = ({ detail, credits }) => {
    const {
        poster_path,
        backdrop_path,
        release_date
    } = detail || {}
    const { t } = useTranslation('common')
    const src = poster_path || backdrop_path || ''
    return (
        <div className='flex w-full'>
            <div>
                <Image className='overflow-hidden rounded-xl' key={src} src={src && `${imageBasePath}/${src}`} width={300} height={450} />
            </div>
            <div className='ml-4 flex w-full flex-1 flex-col gap-4 overflow-hidden text-text-label'>
                <div>
                    <h3 className='mb-2 text-lg'>{t('over-view')}</h3>
                    <p id='detail' className='overflow-y-auto'>
                        {detail?.overview}
                    </p>
                </div>
                <Credits credits={credits} />
                <div id='release-date' className='ml-auto'>{release_date} {t('release')}</div>
            </div>
        </div>
    );
};

export default Detail;