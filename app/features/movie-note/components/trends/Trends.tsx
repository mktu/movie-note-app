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
            <h2 className='flex items-center w-full border-b border-border-main text-xl'>
                <TrendIcon className='h-5 w-5 fill-text-main mr-2' />
                <span>話題の映画のノートを書く</span>
            </h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2 w-full overflow-auto'>
                {trends.results.map(v => (
                    <Card className='mx-1' key={v.id} path={`/app/new-note?tmdbId=${v.id}&lng=${i18n.language}`} {...v} />
                ))}
            </div>
        </div>
    );
};

export default Trends;