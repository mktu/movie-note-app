import type { FC } from 'react'
import { useTranslation } from 'react-i18next';
import TrendIcon from '~/components/icons/ArrowTrendUp';


import type { TmdbTrends } from '../../utils/tmdb';
import Card from './Card';

type Porps = {
    trends: TmdbTrends
}

const Trends: FC<Porps> = ({
    trends
}) => {
    const { i18n } = useTranslation()
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='flex w-full items-center border-b border-border-main text-xl'>
                <TrendIcon className='mr-2 h-5 w-5 fill-text-main' />
                <span>話題の映画のノートを書く</span>
            </h2>
            <div className='grid w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 overflow-auto'>
                {trends.results.map(v => (
                    <Card className='mx-1' key={v.id} path={`/app/new-note?tmdbId=${v.id}&lng=${i18n.language}`} {...v} />
                ))}
            </div>
        </div>
    );
};

export default Trends;