import type { FC } from 'react';
import BoldType from '../icons/BoldType';
import ItalicType from '../icons/ItalicType';
import UnderlineType from '../icons/UnderlineType';
import FontSize from './FontSize';
import Format from './Format';
import Image from './Image';
import { LinkInserter } from '../../features/link/';

const Toolbar: FC = () => {
    return (
        <div className='relative flex items-center gap-1'>
            <FontSize />
            <Format type='bold' renderIcon={(className) => <BoldType className={className} />} />
            <Format type='italic' renderIcon={(className) => <ItalicType className={className} />} />
            <Format type='underline' renderIcon={(className) => <UnderlineType className={className} />} />
            <LinkInserter />
            <Image />
        </div >
    );
};

export default Toolbar;