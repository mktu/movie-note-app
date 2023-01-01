import type { FC } from 'react'
import { TextButton } from '~/components/buttons';
import Unlink from '../../icons/Unlink';

type Props = Parameters<typeof TextButton>[0]

const UnlinkButton: FC<Props> = (props) => {
    return (
        <TextButton className='group flex items-center gap-1' theme='label' {...props}>
            <Unlink className='h-5 w-5 group-hover:fill-text-main fill-text-label' />
            <span>Unlink</span>
        </TextButton>
    );
};

export default UnlinkButton;