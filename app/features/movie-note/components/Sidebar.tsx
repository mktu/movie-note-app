import type { FC } from "react";
import { useContext } from "react";
import { Menu } from '@headlessui/react'
import { UserContext } from "~/providers/user";
import UserIcon from '~/components/icons/User'
import { Link, useSubmit } from "@remix-run/react";
import HomeIcon from '~/components/icons/Home'
import SearchIcon from '~/components/icons/Search'
import clsx from "clsx";
import SidebarNote from "./SidebarNote";

const Sidebar: FC = () => {
    const { name } = useContext(UserContext)
    const submit = useSubmit();
    const links = [
        { name: 'HOME', icon: <HomeIcon className='h-5 w-5 fill-text-main' />, link: '/app' },
        { name: 'SEARCH', icon: <SearchIcon className='h-5 w-5 fill-text-main' />, link: '/search' },
    ]

    return (
        <div className='flex w-full flex-col divide-y divide-border-main'>
            <Menu as='div'>
                <Menu.Button className='flex w-full items-center p-2 focus:bg-sidebar-focus focus:outline-none'>
                    <UserIcon className='mr-2 h-5 w-5 fill-text-main' />
                    <div>{name}</div>
                </Menu.Button>
                <Menu.Items className="absolute mx-2 mt-2 w-[128px] rounded border border-border-dark bg-white p-2">
                    <Menu.Item>
                        {() => (
                            <Link to='/' className={clsx('block text-text-main')}>
                                編集
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {() => (
                            <button onClick={() => {
                                submit(null, { action: 'logout', method: 'post' })
                            }}>Logout</button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>
            <ul className="">
                {links.map(l => (
                    <li key={l.name} className='p-2'>
                        <Link to={l.link} className='flex items-center text-text-main'>
                            {l.icon}
                            <span className="ml-2">{l.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                <SidebarNote />
            </div>
        </div>
    )
}

export default Sidebar