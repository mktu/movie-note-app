import clsx from 'clsx';
import UserPlaceholder from '~/components/icons/User';
import { useNavigatorContext } from '~/providers/navigator/Context';

import { Menu } from '@headlessui/react';

import { UserIcon } from '../image';

import type { FC } from 'react'
import type { UserType } from '../../server/db/user.server';


type Props = {
    onLogout: () => void,
    user: UserType
}
const UserMenu: FC<Props> = ({
    onLogout,
    user
}) => {
    const { navigator: Navigator } = useNavigatorContext()
    return (
        <Menu as='div'>
            <Menu.Button className='flex w-full items-center p-2 focus:bg-sidebar-focus focus:outline-none'>
                {user.image ? (
                    <UserIcon width={48} height={48} src={user.image} alt={'user'} />
                ) : <UserPlaceholder className='h-5 w-5 fill-text-main' />}
                <div className='ml-2'>{user.name}</div>
            </Menu.Button>
            <Menu.Items className="absolute mx-2 mt-2 w-[128px] rounded border border-border-dark bg-white p-2">
                <Menu.Item>
                    {() => (
                        <Navigator to='/app/profile' className={clsx('block text-text-main')}>
                            編集
                        </Navigator>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {() => (
                        <button onClick={onLogout}>Logout</button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

export default UserMenu;