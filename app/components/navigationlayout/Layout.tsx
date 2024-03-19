import type { FC, ReactNode } from 'react'
import Stars from '../icons/Stars';
import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

type Props = {
    userMenu: ReactNode,
    children: ReactNode
}

const Layout: FC<Props> = ({
    userMenu,
    children
}) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex min-h-screen flex-col bg-black'>
            <nav className='flex items-center bg-black px-4 py-2'>
                <div className='flex items-center gap-4'>
                    <Stars className='h-12 w-12 fill-white' />
                    <span className='text-2xl font-bold text-onprimary-main'>Movie Note App</span>
                </div>
                <div className='ml-auto'>
                    {userMenu}
                </div>
            </nav>
            <main className='flex-1 bg-bg-main p-4'>{children}</main>
            <footer className='flex items-center justify-end gap-4 p-6 text-onprimary-main'>
                <div>
                    ©︎mktu 2024
                </div>
                <Link className='text-onprimary-main hover:underline' to='https://developer.mozilla.org/en-US/docs/Web/API/FormData/append'>{t('inquiry')}</Link>
                <Link className='text-onprimary-main hover:underline' to='https://developer.mozilla.org/en-US/docs/Web/API/FormData/append'>{t('privacy-policy')}</Link>
                <Link className='text-onprimary-main hover:underline' to='https://developer.mozilla.org/en-US/docs/Web/API/FormData/append'>{t('terms')}</Link>
            </footer>
        </div>
    );
};

export default Layout;