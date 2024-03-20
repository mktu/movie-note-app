import { Menu } from '@headlessui/react';
import { useCallback, type FC } from 'react'
import HomeIcon from '~/components/icons/Home';
import LogoutIcon from '~/components/icons/Logout';
import { UserIcon } from '~/features/profile/components/image';
import { useUserContext } from '~/providers/user/Context';
import UserPlaceholder from '~/components/icons/User';
import { useNavigatorContext } from '~/providers/navigator/Context';
import { OutlinedButton } from '../buttons';


const UserMenu: FC = () => {
    const { name, image } = useUserContext() || {}
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const onLogout = useCallback(() => {
        navigate('/logout')
    }, [navigate])
    const onHomeClick = useCallback(() => {
        navigate('/app')
    }, [navigate])
    return (
        <div className='flex items-center gap-4'>
            <OutlinedButton onClick={onHomeClick} name='home' className='flex items-center gap-2'>
                <HomeIcon className='h-5 w-5 fill-onprimary-main' />
                <span className='text-onprimary-main'>HOME</span>
            </OutlinedButton>
            <Menu as='div'>
                <Menu.Button className='flex w-full items-center p-2 focus:outline-none'>
                    {image ? (
                        <UserIcon width={48} height={48} src={image} alt={'user'} color='onprimary' />
                    ) : <UserPlaceholder className='h-5 w-5 fill-onprimary-main' />}
                    <div className='ml-2 text-onprimary-main'>{name}</div>
                </Menu.Button>
                <Menu.Items className="absolute rounded border border-border-dark bg-white px-4 py-2">
                    <Menu.Item>
                        {() => (
                            <button className='flex items-center gap-2' onClick={onLogout}>
                                <LogoutIcon className='h-5 w-5 fill-text-main' />
                                Logout
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Menu>

        </div>
    );
};

export default UserMenu;