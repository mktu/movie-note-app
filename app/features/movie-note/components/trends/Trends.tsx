import type { FC } from 'react'
import TrendIcon from '~/components/icons/ArrowTrendUp'
const Trends: FC = () => {
    return (
        <div className='flex flex-col gap-2'>
            <h3 className='flex items-center w-full border-b border-border-main'>
                <TrendIcon className='h-5 w-5 fill-text-main mr-2' />
                <span>話題の映画のノートを書く</span>
            </h3>
        </div>
    );
};

export default Trends;