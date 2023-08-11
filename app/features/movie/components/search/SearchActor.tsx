import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { TextInput } from '~/components/inputs';
import { useActorSearch } from '~/features/tmdb/hooks/useSearch';
import ActorOptionItem from './ActorOptionItem';

type Props = {
    onSelected: () => void
}

const SearchActor: FC<Props> = ({
    onSelected
}) => {
    const { t } = useTranslation()
    const { query, setQuery, searchResult } = useActorSearch()
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
                    <div className='flex h-full flex-col gap-1 overflow-auto'>
                        {searchResult.results.slice(0, 10).map((result) => (
                            <ActorOptionItem key={result.id} result={result} onSelected={onSelected} />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default SearchActor;