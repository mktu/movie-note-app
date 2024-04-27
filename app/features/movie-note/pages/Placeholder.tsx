import type { FC } from 'react'
import { PictureAndLines, SingleLine } from '~/components/skeltons';
import { MovieLayout } from '../components/layout';

const Placeholder: FC = () => {
    return (
        <MovieLayout
            header={(<SingleLine className='w-full' height={32} />)}
            note={<PictureAndLines className='w-full px-4' />}
        />
    );
};

export default Placeholder;