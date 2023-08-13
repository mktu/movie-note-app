import type { FC, ReactNode } from 'react'


type Props = {
    header: ReactNode,
    actor: ReactNode,
    movieCredits: ReactNode
}

export const ActorLayout: FC<Props> = ({
    header,
    actor,
    movieCredits
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 py-5 px-10'>
            {header}
            <div className='flex w-full items-center'>
                {actor}
            </div>
            <div className='flex w-full items-center'>
                {movieCredits}
            </div>
        </div>
    );
};