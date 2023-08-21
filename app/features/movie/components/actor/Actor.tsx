import type { FC } from 'react'
import type { Actor } from '~/features/tmdb';
import Image from '~/components/Image';
import { TmdbmageBasePath } from '@utils/constants';
import { useTranslation } from 'react-i18next';

const imageBasePath = `${TmdbmageBasePath}/w600_and_h900_bestv2`
const imageBasePaths = [
    `${TmdbmageBasePath}/w300_and_h450_bestv2`,
    imageBasePath,
]

type Props = {
    actor: Actor
}

const ActorComponent: FC<Props> = ({ actor }) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex w-full justify-center gap-4'>
            <Image
                alt={actor.name || 'Error'}
                className='overflow-hidden rounded-xl'
                key={actor.id}
                src={`${imageBasePath}/${actor.profile_path}`}
                srcSet={imageBasePaths.map((path, idx) => `${path}/${actor.profile_path} ${idx + 1}x`).join(',')}
                width={300}
                height={450} />
            <div className='ml-4 flex w-full flex-1 flex-col gap-4 overflow-hidden text-text-label'>
                <div>{t('birthday', { birthday: actor.birthday })} ({actor.place_of_birth})</div>
                <p id='detail' className='overflow-y-auto'>
                    {actor.biography || t('no-biography')}
                </p>
            </div>
        </div>
    );
};

export default ActorComponent;