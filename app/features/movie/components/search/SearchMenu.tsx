import type { FC } from 'react';
import { TextButton } from '~/components/buttons';
import SearchIcon from '~/components/icons/Search'
import SearchDialog from './SearchDialog';
import { useAppLayoutContext } from '~/providers/app-layout';

const SearchMenu: FC = () => {
    const { setOpenMobileMenu, setOpenSearchDialog, openSearchDialog } = useAppLayoutContext()
    return (
        <>
            <TextButton onClick={(e) => {
                setOpenSearchDialog(true)
                setOpenMobileMenu(false)
            }} paddings='' className='flex w-full items-center gap-2 p-2 text-text-main hover:bg-surface-hover'>
                <SearchIcon className='size-5' />
                <span>SEARCH</span>
            </TextButton>
            <SearchDialog open={openSearchDialog} onClose={() => { setOpenSearchDialog(false) }} />
        </>
    );
};

export default SearchMenu;