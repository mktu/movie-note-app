import HomeIcon from '~/components/icons/Home';
import SearchIcon from '~/components/icons/Search';
import SquarePlus from '~/components/icons/SquarePlus';

import { NavLink } from '@remix-run/react';

import type { FC } from 'react'

const links = [
    { name: 'HOME', icon: <HomeIcon className='h-5 w-5 fill-text-main' />, link: '/app' },
    { name: 'SEARCH', icon: <SearchIcon className='h-5 w-5 fill-text-main' />, link: '/search' },
    { name: 'NEW NOTE', icon: <SquarePlus className='h-5 w-5 fill-text-main' />, link: '/app/new-note' },
]

const StaticLinks: FC = () => {
    return (
        <ul>
            {links.map(l => (
                <li key={l.name} className=''>
                    <NavLink to={l.link} className='flex items-center p-2 text-text-main hover:bg-surface-hover'>
                        {l.icon}
                        <span className="ml-2">{l.name}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default StaticLinks;