import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { MovieDetail } from '../../utils/tmdb';
import Image from './Image'

const imageBasePath = `${TmdbmageBasePath}/w600_and_h900_bestv2`

type Props = {
    detail: MovieDetail | null
}

const Detail: FC<Props> = ({ detail }) => {
    const {
        poster_path,
        backdrop_path,
        release_date
    } = detail || {}
    const { t } = useTranslation('common')
    const src = poster_path || backdrop_path || ''
    return (
        <div className='flex w-full'>
            <Image className='overflow-hidden rounded-xl' key={src} src={src && `${imageBasePath}/${src}`} width={300} height={450} />
            <div className='ml-4 flex h-[256px] flex-1 flex-col text-text-label'>
                <h5 className='mb-2 text-lg'>あらすじ</h5>
                <p id='detail' className='h-full overflow-y-auto'>
                    {detail?.overview}
                </p>
                <div id='release-date' className='ml-auto'>{release_date} {t(('release'))}</div>
            </div>
        </div>
    );
};

export default Detail;