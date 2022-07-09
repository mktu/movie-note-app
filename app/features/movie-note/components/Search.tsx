import { Fragment } from "react";
import type { FC } from "react";
import { Combobox, Transition } from "@headlessui/react";
import XIcon from "~/components/icons/X";
import ButtonBase from '~/components/buttons/Base'
import { useTmdbSearch } from "../hooks/useTmdb";
import clsx from "clsx";

type Props = {
    selected: string,
    setSelected: (select: string) => void
}

const Search: FC<Props> = ({
    selected,
    setSelected
}) => {
    const { query, setQuery, searchResult, count, imageBasePath } = useTmdbSearch()
    const selectedText = searchResult?.results?.find(v => v.id === selected)?.title || ''
    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1 w-full">
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
                            autoComplete='off'
                            className="w-full border-none py-2 pl-3 pr-10 outline-none focus:ring-0"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                    )}

                    <div className='ml-auto'>{count}</div>
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
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    {searchResult ? 'Nothing found' : 'Loading...'}
                                </div>
                            ) : (
                                searchResult.results.slice(0, 10).map((result) => (
                                    <Combobox.Option
                                        key={result.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 px-2 ${active ? 'bg-surface-hover' : 'bg-surface-main'
                                            }`
                                        }
                                        value={result.id}
                                    >
                                        {() => (
                                            <div className='flex items-center'>
                                                {result.poster_path && <img className='mr-2 rounded-sm' width={32} height={32} src={`${imageBasePath}/${result.poster_path}`} alt={result.title} />}
                                                <span className='block truncate font-normal'  >
                                                    {result.title} ({result.release_date})
                                                </span>
                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}

export default Search