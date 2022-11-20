import type { FC } from 'react'
import Trends from '../components/trends';
import DashboardSearchbar from '../components/search-title/DashboardSearchbar';

const Dashboard: FC = () => {
    return (
        <main className='p-6 flex flex-col gap-6'>
            <section>
                <DashboardSearchbar />
            </section>
            <section>
                <Trends />
            </section>
        </main>
    );
};

export default Dashboard;