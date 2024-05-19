import clsx from 'clsx';
import ButtonBase from '~/components/buttons/Base';
import XIcon from '~/components/icons/X';

import { Combobox } from '@headlessui/react';

import type { FC } from "react";

type Props = {
    selected: string,
    floating?: boolean,
    onReselect?: () => void
}

const Search: FC<Props> = ({
    selected,
    floating,
    onReselect
}) => {
    return (
        <Combobox value={selected}>
            <div className="relative mt-1 w-full bg-white">
                <div className={clsx(
                    "relative flex w-full cursor-default items-center overflow-hidden rounded border border-border-main text-left",
                    !floating && 'shadow-sm'
                )}>
                    <ButtonBase
                        className='flex items-center rounded border-none bg-surface-selected py-2 pl-3 pr-10 ring-inset'
                        onClick={onReselect}>
                        {selected}
                        <XIcon className='ml-2 size-5 stroke-text-main' aria-label='clear' />
                    </ButtonBase>
                </div>
            </div>
        </Combobox>
    )
}

export default Search