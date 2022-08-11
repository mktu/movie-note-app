import { TmdbmageBasePath } from '@utils/constants';
import clsx from 'clsx';
import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import type { Credits } from '../../utils/tmdb';
import Image from './Image'

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
    const { cast, crew } = credits || { cast: [], crew: [] }
    const { t } = useTranslation('common')
    return (
        <div className={clsx('flex w-full flex-col gap-4', clasName)}>
            <div>
                <div className='flex w-full overflow-x-auto py-2'>
                    {Object.keys(jobMap).map(job => (
                        <div key={job} className='mr-4 whitespace-nowrap'>
                            <span>{t(job)} : </span>
                            <span>
                                {crew.filter(c => jobMap[job].includes(c.job)).map(crew => crew.name).join(',')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h3 className='mb-2 text-lg'>キャスト</h3>
                <div className='flex w-full overflow-x-auto py-2'>
                    {cast.map((cast) => {
                        return (
                            <div key={cast.id} className='mr-2'>
                                <Image
                                    alt={'No-Image'}
                                    src={`${imageBasePath}${cast.profile_path}`}
                                    srcSet={imageBasePaths.map((path, idx) => `${path}${cast.profile_path} ${idx + 1}x`).join(',')}
                                    width={138}
                                    height={175} className='rounded' />
                                <div className='text-sm'>{cast.name}</div>
                                <div className='text-sm'>({cast.character})</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default CreditsComp;