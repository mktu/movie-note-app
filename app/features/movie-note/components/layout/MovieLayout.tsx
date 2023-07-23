import { Transition } from '@headlessui/react';
import type { FC, ReactNode } from 'react'

type MovieInfo = {
    detail: ReactNode,
    metaInfo: ReactNode,
    imdb: ReactNode
}

type Props = {
    header: ReactNode,
    note?: ReactNode,
    movieInfo?: MovieInfo | null
}

const MovieLayout: FC<Props> = ({
    header,
    movieInfo,
    note,
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 py-5 px-10'>
            {header}
            {note && (
                <div className='rounded-lg border border-dashed border-border-dark p-6'>
                    <div className='min-h-[512px]'>
                        {note}
                    </div>
                </div>
            )}
            <div className='flex w-full items-center'>
                {movieInfo?.metaInfo}
                <div className='ml-auto'>{movieInfo?.imdb}</div>
            </div>
        </div>
    );
};

export default MovieLayout;