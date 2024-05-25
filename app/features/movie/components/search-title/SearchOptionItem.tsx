import { ComboboxOption } from '@headlessui/react';
import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import type { SearchMovieResult } from '~/features/tmdb';

const imageBasePath = `${TmdbmageBasePath}/w200`

type Props = {
    result: SearchMovieResult['results'][0],
    idx: number
}

const SearchOptionItem: FC<Props> = ({
    result,
    idx
}) => {
    return (
        <ComboboxOption
            as='li'
            className='relative cursor-default select-none bg-surface-main p-2 data-[active]:bg-surface-hover'
            value={result.id}
        >
            <div className='flex items-center' data-testid={`option-${idx}`}>
                <span className='mr-2 h-[48px] w-[32px] overflow-hidden rounded-sm bg-image-placeholder'>
                    {result.poster_path ? <img width={32} height={48} src={`${imageBasePath}/${result.poster_path}`} alt={result.title} /> : (
                        <svg className='size-full border border-border-dark stroke-border-dark'>
                            <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                        </svg>
                    )}
                </span>
                <span className='block truncate font-normal'  >
                    {result.title} ({result.release_date})
                </span>
            </div>
        </ComboboxOption>
    );
};

export default SearchOptionItem;