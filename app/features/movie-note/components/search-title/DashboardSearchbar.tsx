import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigatorContext } from '~/providers/navigator/Context';
import { useUserContext } from '~/providers/user/Context';
import SearchTitle from './SearchTitle';

const DashboardSearchbar: FC = () => {
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
    const { name } = useUserContext()
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='flex items-center w-full border-b border-border-main text-2xl'>
                {name}さん, ようこそ Movie Note App へ！
            </h1>
            <p>最近見た映画や、好きな映画の感想をノートを書きましょう！</p>
            <div className='py-3'>
                <SearchTitle selected='' setSelected={(tmdbId) => {
                    navigate(`/app/new-note?tmdbId=${tmdbId}&lng=${i18n.language}`)
                }} />
            </div>
        </div>
    );
};

export default DashboardSearchbar;