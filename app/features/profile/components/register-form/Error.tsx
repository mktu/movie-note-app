import type { FC } from 'react'
import Info from '~/components/icons/Info';

type Props = {
    error: string
}

const Error: FC<Props> = ({ error }) => {
    return (
        <div className='flex items-center'>
            <Info className='mr-1 size-5 fill-red-500' />
            <p className="flex-1 text-red-500">{error}</p>
        </div>
    );
};

export default Error;