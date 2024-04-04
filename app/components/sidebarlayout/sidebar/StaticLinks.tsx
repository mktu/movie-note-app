import type { FC } from 'react';
import HomeIcon from '~/components/icons/Home';
import { useAppLayoutContext } from '~/providers/app-layout';
import { useNavigatorContext } from '~/providers/navigator/Context';

const links = [
    { name: 'HOME', icon: <HomeIcon className='h-5 w-5 fill-text-main' />, link: '/app' },
]

const StaticLinks: FC = () => {
    const { navigator: Navigator } = useNavigatorContext()
    const { setOpenMobileMenu } = useAppLayoutContext()
    return (
        <ul>
            {links.map(l => (
                <li key={l.name} className=''>
                    <Navigator onClick={() => {
                        setOpenMobileMenu(false)
                    }} to={l.link} className='flex items-center p-2 text-text-main hover:bg-surface-hover'>
                        {l.icon}
                        <span className="ml-2">{l.name}</span>
                    </Navigator>
                </li>
            ))}
        </ul>
    );
};

export default StaticLinks;