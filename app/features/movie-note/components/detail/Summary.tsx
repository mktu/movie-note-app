import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { Credits as CreditsType, TmdbDetail } from '../../utils/tmdb';
import Image from '~/components/Image'

///t/p/w300_and_h450_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 1x, /t/p/w600_and_h900_bestv2/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg 2x

const imageBasePath = `${TmdbmageBasePath}/w300_and_h450_bestv2`
const imageBasePaths = [
    `${TmdbmageBasePath}/w600_and_h900_bestv2`,
    imageBasePath,
]


type Props = {
    detail: TmdbDetail | null,
    credits: CreditsType | null
}

const Summary: FC<Props> = ({
    detail
}) => {
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
                    width={64}
                    height={96} />
            </div>
            <div className='ml-4 flex w-full flex-1 flex-col gap-1 overflow-hidden text-text-label'>
                <div>{detail?.title}</div>
                <p id='detail' className='text-sm line-clamp-2'>
                    {detail?.overview}
                </p>
                <div className='text-sm' id='release-date'>({release_date} {t('release')})</div>
            </div>
        </div>
    );
};

export default Summary;