import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from '~/components/buttons';

import { TmdbmageBasePath } from '@utils/constants';

import Image from '~/components/Image'

import type { FC } from 'react';
import type { Credits } from '~/features/tmdb';
import { useNavigatorContext } from '~/providers/navigator/Context';


const imageBasePath = `${TmdbmageBasePath}/w276_and_h350_face`
const imageBasePaths = [
    `${TmdbmageBasePath}/w138_and_h175_face`,
    imageBasePath,
]

type Props = {
    credits: Credits | null,
    clasName?: string
}

const jobMap: { [key: string]: string[] } = {
    producer: ['Producer'],
    director: ['Director'],
    writer: ['Screenplay', 'Writer']
}

const CreditsComp: FC<Props> = ({
    credits,
    clasName
}) => {
    const [showAll, setShowAll] = useState(false)
    const { cast, crew } = credits || { cast: [], crew: [] }
    const { t } = useTranslation('common')
    const target = showAll ? cast : cast.slice(0, 8)
    const { navigator: Navigator } = useNavigatorContext()
    const { i18n } = useTranslation()
    return (
        <div className={clsx('flex w-full flex-col gap-4', clasName)}>
            <div>
                <div className='flex w-full overflow-x-auto py-2'>
                    {Object.keys(jobMap).map(job => (
                        <div key={job} className='mr-4'>
                            <span>{t(job)} : </span>
                            <span>
                                {crew.filter(c => jobMap[job].includes(c.job)).map(crew => crew.name).join(',')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className='mb-2 text-lg'>{t('casts')}</h3>
                <div className='flex w-full overflow-x-auto py-2'>
                    {target.map((cast) => {
                        return (
                            <div key={cast.id} className='mr-2'>
                                <Image
                                    alt={'No-Image'}
                                    src={`${imageBasePath}${cast.profile_path}`}
                                    srcSet={imageBasePaths.map((path, idx) => `${path}${cast.profile_path} ${idx + 1}x`).join(',')}
                                    width={138}
                                    height={175} className='rounded' />
                                <Navigator className='text-sm' to={`/app/actors/${cast.id}?lng=${i18n.language}`}>{cast.name}</Navigator>
                                <div className='text-sm'>({cast.character})</div>
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

export default CreditsComp;