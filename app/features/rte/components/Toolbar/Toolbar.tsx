import type { FC } from 'react';
import BoldType from '../icons/BoldType';
import ItalicType from '../icons/ItalicType';
import UnderlineType from '../icons/UnderlineType';
import FontSize from './FontSize';
import Format from './Format';
import InsertLink from './InsertLink/InsertLink';

const Toolbar: FC = () => {
    return (
        <div className='flex items-center relative gap-1'>
            <FontSize />
            <Format type='bold' renderIcon={(className) => <BoldType className={className} />} />
            <Format type='italic' renderIcon={(className) => <ItalicType className={className} />} />
            <Format type='underline' renderIcon={(className) => <UnderlineType className={className} />} />
            <InsertLink />
        </div >
    );
};

export default Toolbar;