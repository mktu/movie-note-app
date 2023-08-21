import type { FC } from 'react';
import { useState } from 'react'
import type { RadioType } from './Radio';
import Radio from './Radio';
import SearchMovie from './SearchMovie';
import SearchActor from './SearchActor';

type Props = {
    onSelected: () => void
}

const Search: FC<Props> = ({
    onSelected
}) => {
    const [radioType, setRadioType] = useState<RadioType>('movie')
    return (
        <div className='flex h-[450px] flex-col gap-2'>
            <Radio radioType={radioType} onSelect={setRadioType} />
            {radioType === 'movie' ? (
                <SearchMovie onSelected={onSelected} />
            ) : (
                <SearchActor onSelected={onSelected} />
            )}
        </div>
    );
};

export default Search;