import { TmdbmageBasePath } from '@utils/constants';

import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { SearchActorResult } from '~/features/tmdb';
import { useNavigatorContext } from '~/providers/navigator/Context';

const imageBasePath = `${TmdbmageBasePath}/w200`


type Props = {
    result: SearchActorResult['results'][0],
    onSelected: () => void
}

const ActorOptionItem: FC<Props> = ({ result, onSelected }) => {
    const { navigator: Navigator } = useNavigatorContext()
    const { i18n } = useTranslation()
    return (
        <div className='relative flex items-center' >
            <div className='mr-2 h-[48px] w-[32px] overflow-hidden rounded-sm bg-image-placeholder'>
                {result.profile_path ? <img width={32} height={48} src={`${imageBasePath}/${result.profile_path}`} alt={result.name} /> : (
                    <svg className='h-full w-full border border-border-dark stroke-border-dark'>
                        <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                    </svg>
                )}
            </div>
            <Navigator className='absolute inset-0' to={`/app/actors/${result.id}?lng=${i18n.language}`} onClick={onSelected} />
            <div className='block truncate font-normal'>
                <div className='text-[#1b72e8]'>{result.name}</div>
                <div className='flex items-center gap-1 text-xs'>{result.known_for.map(v => (
                    <Navigator className='z-10' onClick={onSelected} to={`/app/movies/${v.id}?lng=${i18n.language}`} key={v.id}>{v.title}</Navigator>
                ))}</div>
            </div>
        </div>
    );
};

export default ActorOptionItem;