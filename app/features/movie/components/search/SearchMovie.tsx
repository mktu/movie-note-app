import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextInput } from '~/components/inputs';
import { useMovieSearch } from '~/features/tmdb';
import MovieOptionItem from './MovieOptionItem';

type Props = {
    onSelected: () => void
}

const SearchMovie: FC<Props> = ({
    onSelected
}) => {
    const { t } = useTranslation()
    const { query, setQuery, searchResult } = useMovieSearch()
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
                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                        {searchResult ? 'Nothing found' : 'Loading...'}
                    </div>
                ) : (
                    <div className='flex h-full flex-col gap-1 overflow-auto'>
                        {searchResult.results.slice(0, 10).map((result) => (
                            <MovieOptionItem key={result.id} result={result} onSelected={onSelected} />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default SearchMovie;