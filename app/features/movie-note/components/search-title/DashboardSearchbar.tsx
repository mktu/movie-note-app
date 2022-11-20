import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import SearchIcon from '~/components/icons/Search'
import { useNavigatorContext } from '~/providers/navigator/Context';
import SearchTitle from './SearchTitle';

const DashboardSearchbar: FC = () => {
    const { useNavigator } = useNavigatorContext()
    const { navigate } = useNavigator()
    const { i18n } = useTranslation()
    return (
        <div className='flex flex-col gap-4'>
            <h3 className='flex items-center w-full border-b border-border-main'>
                <SearchIcon className='h-5 w-5 fill-text-main mr-2' />
                <span>映画を検索してノートを書く</span>
            </h3>
            <SearchTitle selected='' setSelected={(tmdbId) => {
                navigate(`/app/new-note?tmdbId=${tmdbId}&lng=${i18n.language}`)
            }} />
        </div>
    );
};

export default DashboardSearchbar;