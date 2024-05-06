import clsx from 'clsx';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonBase from '~/components/buttons/Base';
import XIcon from '~/components/icons/X';

import { Combobox, Transition } from '@headlessui/react';

import { useMovieSearch } from '~/features/tmdb/hooks';
import SearchOptionItem from './SearchOptionItem';

import type { FC } from "react";
import type { SearchMovieResult } from '~/features/tmdb';

type Props = {
    selected: string,
    setSelected: (select: string) => void,
    searchResult?: SearchMovieResult
}

const Search: FC<Props> = ({
    selected,
    setSelected,
    searchResult: init
}) => {
    const { t } = useTranslation()
    const { query, setQuery, searchResult } = useMovieSearch(init)
    const selectedText = searchResult?.results?.find(v => v.id === selected)?.title || ''
    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 w-full bg-white">
                <div className={clsx(
                    "relative flex w-full cursor-default items-center overflow-hidden rounded border border-border-main text-left shadow-sm",
                    !selectedText && 'focus-within:ring-2 focus-within:ring-focus'
                )}>

                    {selectedText ? (<ButtonBase
                        className='flex items-center rounded border-none bg-surface-selected py-2 pl-3 pr-10 ring-inset'
                        onClick={() => {
                            setSelected('')
                            setQuery('')
                        }}>
                        {selectedText}
                        <XIcon className='ml-2 h-5 w-5 stroke-text-main' aria-label='clear' />
                    </ButtonBase>) : (
                        <Combobox.Input
                            data-testid='search-title'
                            autoComplete='off'
                            name='search-title'
                            placeholder={t('search-title')}
                            className="w-full border-none py-2 pl-3 pr-10 outline-none focus:ring-0"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    )}
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Combobox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none ">
                        {!searchResult?.results || searchResult.results.length === 0 ?
                            query === '' ? <></> : (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    {searchResult ? 'Nothing found' : 'Loading...'}
                                </div>
                            ) : (
                                searchResult.results.slice(0, 10).map((result, idx) => (
                                    <SearchOptionItem idx={idx} key={result.id} result={result} />
                                ))
                            )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default Search