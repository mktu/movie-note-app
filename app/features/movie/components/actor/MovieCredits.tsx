import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';
import Image from '~/components/Image';
import type { MovieCredits } from '~/features/tmdb';

import { TmdbmageBasePath } from '@utils/constants';
import { useNavigatorContext } from '~/providers/navigator/Context';

const imageBasePath = `${TmdbmageBasePath}/w276_and_h350_face`
const imageBasePaths = [
    `${TmdbmageBasePath}/w138_and_h175_face`,
    imageBasePath,
]

type Props = {
    movieCredits: MovieCredits
}

const MovieCreditsComponent: FC<Props> = ({
    movieCredits
}) => {
    const { t, i18n } = useTranslation('common')
    const [showAll, setShowAll] = useState(false)
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <div className='flex w-full justify-center gap-4 overflow-x-hidden'>
            <div className='w-full'>
                <h3 className='mb-2 text-lg'>{t('movie-credits')}</h3>
                <div className='flex w-full overflow-x-auto py-2'>
                    {movieCredits.cast.map((cast) => {
                        return (
                            <div key={cast.id} className='mr-2'>
                                <Image
                                    alt={'No-Image'}
                                    src={`${imageBasePath}${cast.poster_path}`}
                                    srcSet={imageBasePaths.map((path, idx) => `${path}${cast.poster_path} ${idx + 1}x`).join(',')}
                                    width={138}
                                    height={175} className='rounded' />
                                <Navigator to={`/app/movies/${cast.id}?lng=${i18n.language}`} className='text-sm'>{cast.title}</Navigator>
                                <div className='text-sm'>({cast.character})</div>
                                <div className='text-sm'>{cast.release_date} {t('release')}</div>
                            </div>
                        )
                    })}
                    {!showAll && (
                        <TextButton onClick={() => { setShowAll(true) }} theme='label'>{t('view-all')}</TextButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieCreditsComponent;