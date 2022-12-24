import type { FC } from 'react'
import Bold from './Bold';
import FontSize from './FontSize';

const Toolbar: FC = () => {
    return (
        <div className='flex items-center relative gap-1'>
            <FontSize />
            <Bold />
        </div>
    );
};

export default Toolbar;