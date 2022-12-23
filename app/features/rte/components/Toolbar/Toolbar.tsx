import type { FC } from 'react'
import FontSize from './FontSize';

const Toolbar: FC = () => {
    return (
        <div className='flex items-center relative'>
            <FontSize />
        </div>
    );
};

export default Toolbar;