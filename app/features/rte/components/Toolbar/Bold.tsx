import type { FC } from 'react'
import { IconButton } from '~/components/buttons';
import BoldType from '../icons/BoldType';

const Bold: FC = () => {
    return (
        <IconButton name='bold' className='hover:bg-surface-hover p-1'>
            <BoldType className='h-4 w-4 fill-text-label' />
        </IconButton>
    );
};

export default Bold;