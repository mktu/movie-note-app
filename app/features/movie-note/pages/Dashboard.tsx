import type { FC } from 'react'
import { DashboardSearchbar } from '~/features/movie';
import Trends from '../components/trends';

import type { TmdbTrends } from '~/features/tmdb';

type Porps = {
    trends: TmdbTrends
}

const Dashboard: FC<Porps> = ({
    trends
}) => {
    return (
        <main className='flex flex-col gap-6 p-6'>
            <section>
                <DashboardSearchbar />
            </section>
            <section>
                <Trends trends={trends} />
            </section>
        </main>
    );
};

export default Dashboard;