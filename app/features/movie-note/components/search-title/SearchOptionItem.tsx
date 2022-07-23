import { Combobox } from '@headlessui/react';
import { TmdbmageBasePath } from '@utils/constants';
import type { FC } from 'react'
import type { SearchResult } from '../../utils/tmdb';

const imageBasePath = `${TmdbmageBasePath}/w200`

type Props = {
    result: SearchResult['results'][0],
}

const SearchOptionItem: FC<Props> = ({
    result
}) => {
    return (
        <Combobox.Option
            className={({ active }) =>
                `relative cursor-default select-none py-2 px-2 ${active ? 'bg-surface-hover' : 'bg-surface-main'
                }`
            }
            value={result.id}
        >
            {() => (
                <div className='flex items-center'>
                    <span className='mr-2 h-[48px] w-[32px] overflow-hidden rounded-sm bg-image-placeholder'>
                        {result.poster_path ? <img width={32} height={48} src={`${imageBasePath}/${result.poster_path}`} alt={result.title} /> : (
                            <svg className='h-full w-full border border-border-dark stroke-border-dark'>
                                <line stroke="4, 4" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
                            </svg>
                        )}
                    </span>
                    <span className='block truncate font-normal'  >
                        {result.title} ({result.release_date})
                    </span>
                </div>
            )}
        </Combobox.Option>
    );
};

export default SearchOptionItem;