import { Transition } from '@headlessui/react';
import type { FC, ReactNode } from 'react'

type MovieInfo = {
    detail: ReactNode,
    metaInfo: ReactNode,
    imdb: ReactNode
}

type Props = {
    header: ReactNode,
    movieInfo?: MovieInfo | null
}

export const MovieLayout: FC<Props> = ({
    header,
    movieInfo,
}) => {
    return (
        <div className='relative w-full py-5 px-10'>
            {header}
            <Transition
                className='flex w-full flex-col gap-2'
                show={Boolean(movieInfo)}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className='flex w-full items-center'>
                    {movieInfo?.metaInfo}
                    <div className='ml-auto'>{movieInfo?.imdb}</div>
                </div>
                <div className='flex w-full items-center'>
                    {movieInfo?.detail}
                </div>
            </Transition>
        </div>
    );
};