import type { FC, ReactNode } from 'react';
import BoldType from '../icons/BoldType';
import ItalicType from '../icons/ItalicType';
import UnderlineType from '../icons/UnderlineType';
import FontSize from './FontSize';
import Format from './Format';
import Image from './Image';
import { LinkInserter } from '../../features/link/';

type Props = {
    templateComponent: ReactNode
}

const Toolbar: FC<Props> = ({
    templateComponent
}) => {
    return (
        <div className='relative flex items-center gap-1'>
            <FontSize />
            <Format type='bold' renderIcon={(className) => <BoldType className={className} />} />
            <Format type='italic' renderIcon={(className) => <ItalicType className={className} />} />
            <Format type='underline' renderIcon={(className) => <UnderlineType className={className} />} />
            <LinkInserter />
            <Image />
            {templateComponent}
        </div >
    );
};

export default Toolbar;