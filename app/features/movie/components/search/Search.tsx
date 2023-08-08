import type { FC } from 'react';
import { useState } from 'react'
import type { RadioType } from './Radio';
import Radio from './Radio';
import SearchMovie from './SearchMovie';

type Props = {
    onSelectMovie: (id: string) => void
}

const Search: FC<Props> = ({
    onSelectMovie
}) => {
    const [radioType, setRadioType] = useState<RadioType>('movie')
    return (
        <div className='flex h-[450px] flex-col gap-2'>
            <Radio radioType={radioType} onSelect={setRadioType} />
            {radioType === 'movie' ? (
                <SearchMovie onSelect={onSelectMovie} />
            ) : (
                <div>tbd</div>
            )}
        </div>
    );
};

export default Search;