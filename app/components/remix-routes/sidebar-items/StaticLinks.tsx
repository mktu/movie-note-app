import HomeIcon from '~/components/icons/Home';
import SearchIcon from '~/components/icons/Search';

import { NavLink } from '@remix-run/react';

import type { FC } from 'react'

const links = [
    { name: 'HOME', icon: <HomeIcon className='h-5 w-5 fill-text-main' />, link: '/app' },
    { name: 'SEARCH', icon: <SearchIcon className='h-5 w-5 fill-text-main' />, link: '/search' },
]

const StaticLinks: FC = () => {
    return (
        <ul className=''>
            {links.map(l => (
                <li key={l.name} className='p-2'>
                    <NavLink to={l.link} className='flex items-center text-text-main'>
                        {l.icon}
                        <span className="ml-2">{l.name}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default StaticLinks;