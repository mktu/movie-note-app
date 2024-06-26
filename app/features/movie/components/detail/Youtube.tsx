import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import { IconButton } from '~/components/buttons';
import AnglesLeft from '~/components/icons/AnglesLeft';
import AnglesRight from '~/components/icons/AnglesRight';

import type { Video } from '~/features/tmdb/utils';

type Props = {
    trailers: Video[]
}

const YoutubeContainer: FC<Props> = ({
    trailers
}) => {
    const [current, setCurrent] = useState(0)
    return (
        <div className='flex w-full items-center justify-between gap-4'>
            <IconButton name='back' className={clsx('hidden h-[250px] rounded-sm p-1 md:block',
                'bg-gray-100'
            )} disabled={current === 0} onClick={() => {
                setCurrent(before => before - 1)
            }}>
                <AnglesLeft className={clsx('size-5',
                    current === 0 ? 'fill-gray-300' : 'fill-gray-700'
                )} />
            </IconButton>
            <div className='w-full md:min-h-[360px]'>
                <iframe
                    className='w-full md:min-h-[360px]'
                    src={`https://www.youtube.com/embed/${trailers[current].key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    title="YouTube video"
                />
            </div>
            <IconButton name='next' className={clsx('hidden h-[250px] rounded-sm p-1 md:block',
                'bg-gray-100'
            )} disabled={current >= trailers.length - 1} onClick={() => {
                setCurrent(before => before + 1)
            }}>
                <AnglesRight className={clsx('size-5',
                    current >= trailers.length - 1 ? 'fill-gray-300' : 'fill-gray-700'
                )} />
            </IconButton>
        </div>
    );
};

export default YoutubeContainer;