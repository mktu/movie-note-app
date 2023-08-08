import type { FC } from 'react';
import { useState } from 'react'
import { TextButton } from '~/components/buttons';
import SearchIcon from '~/components/icons/Search'
import SearchDialog from './SearchDialog';

const SearchMenu: FC = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <TextButton onClick={() => { setOpen(true) }} paddings='' className='flex w-full items-center gap-2 p-2 text-text-main hover:bg-surface-hover'>
                <SearchIcon className='h-5 w-5' />
                <span>SEARCH</span>
            </TextButton>
            <SearchDialog open={open} onClose={() => { setOpen(false) }} />
        </>
    );
};

export default SearchMenu;