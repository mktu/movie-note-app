import { TmdbmageBasePath } from '@utils/constants';

import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { SearchMovieResult } from '~/features/tmdb';
import { useNavigatorContext } from '~/providers/navigator/Context';

const imageBasePath = `${TmdbmageBasePath}/w200`


type Props = {
    result: SearchMovieResult['results'][0],
    onSelected: () => void
}

const MovieOptionItem: FC<Props> = ({ result, onSelected }) => {
    const { navigator: Navigator } = useNavigatorContext()
    const { i18n } = useTranslation()
    return (
        <Navigator onClick={onSelected} className='flex items-center' to={`/app/movies/${result.id}?lng=${i18n.language}`}>
            <span className='mr-2 h-[48px] w-[32px] overflow-hidden rounded-sm bg-image-placeholder'>
                {result.poster_path ? <img width={32} height={48} src={`${imageBasePath}/${result.poster_path}`} alt={result.title} /> : (
                    <svg className='h-full w-full border border-border-dark stroke-border-dark'>
                        <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                    </svg>
                )}
            </span>
            <span className='block truncate font-normal'  >
                {result.title} ({result.release_date})
            </span>
        </Navigator>
    );
};

export default MovieOptionItem;