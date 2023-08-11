import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextInput } from '~/components/inputs';
import { useTmdbSearch } from '~/features/tmdb';
import MovieOptionItem from './MovieOptionItem';

type Props = {
    onSelect: (id: string) => void
}

const SearchMovie: FC<Props> = ({
    onSelect
}) => {
    const { t } = useTranslation()
    const { query, setQuery, searchResult } = useTmdbSearch()
    return (
        <div className='flex flex-col gap-2 overflow-hidden p-1'>
            <TextInput
                autoComplete='off'
                name='search-title'
                placeholder={t('search-title')}
                className="w-full border-none outline-none focus:ring-0"
                onChange={(e) => { setQuery(e.target.value) }} />
            {!searchResult?.results || searchResult.results.length === 0 ?
                query === '' ? <></> : (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                        {searchResult ? 'Nothing found' : 'Loading...'}
                    </div>
                ) : (
                    <div className='h-full overflow-auto'>
                        {searchResult.results.slice(0, 10).map((result) => (
                            <MovieOptionItem key={result.id} result={result} onSelect={onSelect} />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default SearchMovie;