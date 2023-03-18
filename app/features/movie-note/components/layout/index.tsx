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
    review?: ReactNode,
    movieInfo?: MovieInfo | null
}

const Layout: FC<Props> = ({
    header,
    movieInfo,
    note,
    review
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
                <div>
                    {review}
                </div>
                <div className='rounded-lg border border-dashed border-border-dark p-6'>
                    <div className='min-h-[512px]'>
                        {note}
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Layout;