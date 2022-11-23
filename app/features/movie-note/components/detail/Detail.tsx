import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { Credits as CreditsType, TmdbDetail } from '../../utils/tmdb';
import Image from '~/components/Image'
import Credits from './Credits'

///t/p/w300_and_h450_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 1x, /t/p/w600_and_h900_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 2x

const imageBasePath = `${TmdbmageBasePath}/w600_and_h900_bestv2`
const imageBasePaths = [
    `${TmdbmageBasePath}/w300_and_h450_bestv2`,
    imageBasePath,
]

type Props = {
    detail: TmdbDetail | null,
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
                <Image
                    alt={detail?.title || 'Error'}
                    className='overflow-hidden rounded-xl'
                    key={src}
                    src={src && `${imageBasePath}/${src}`}
                    srcSet={imageBasePaths.map((path, idx) => `${path}/${src} ${idx + 1}x`).join(',')}
                    width={300}
                    height={450} />
            </div>
            <div className='ml-4 flex w-full flex-1 flex-col gap-4 overflow-hidden text-text-label'>
                <div>
                    <h3 className='mb-2 text-lg'>{t('over-view')}</h3>
                    <p id='detail' className='overflow-y-auto'>
                        {detail?.overview}
                        <span id='release-date'>({release_date} {t('release')})</span>
                    </p>
                </div>
                <Credits credits={credits} />
            </div>
        </div>
    );
};

export default Detail;