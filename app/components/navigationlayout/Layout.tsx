import type { FC, ReactNode } from 'react'
import Stars from '../icons/Stars';

type Props = {
    userMenu: ReactNode,
    children: ReactNode
}

const Layout: FC<Props> = ({
    userMenu,
    children
}) => {
    return (
        <div className='flex min-h-screen flex-col bg-black'>
            <nav className='flex items-center bg-black p-4'>
                <div className='flex items-center gap-4'>
                    <Stars className='h-12 w-12 fill-white' />
                    <span className='text-2xl font-bold text-onprimary-main'>Movie Note App</span>
                </div>
                <div className='ml-auto'>
                    {userMenu}
                </div>
            </nav>
            <main className='flex-1 bg-bg-main p-4'>{children}</main>
            <footer>tbd</footer>
        </div>
    );
};

export default Layout;