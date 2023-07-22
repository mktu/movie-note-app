import clsx from 'clsx';
import type { FC } from 'react'
import type { ImdbRate } from '../types';
import ImdbIcon from './ImdbIcon'

type Props = ImdbRate & {
    className?: string,
    imdbId: string
}

const Imdb: FC<Props> = ({
    rate,
    denominator,
    parameter,
    className,
    imdbId
}) => {
    return (
        <a className={clsx('flex items-center', className)} href={`https://www.imdb.com/title/${imdbId}`} target='_blank' rel='noopener noreferrer'>
            <ImdbIcon className='mr-2 h-10 w-10' />
            <div className='flex items-center text-text-label'>
                <span role='img' aria-label='star' className='mr-1'>⭐️</span>
                <span>{rate}</span>
                <span>/</span>
                <span>{denominator}</span>
                <span className='ml-1'>({parameter})</span>
            </div>
        </a>
    );
};

export default Imdb;