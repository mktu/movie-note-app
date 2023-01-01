import clsx from 'clsx';
import type { FC } from 'react'
import { TextButton } from '~/components/buttons';
import Unlink from '../../icons/Unlink';

type Props = Parameters<typeof TextButton>[0]

const UnlinkButton: FC<Props> = ({ disabled, ...props }) => {
    return (
        <TextButton disabled={disabled} className='group flex items-center gap-1' theme='label' {...props}>
            <Unlink className={clsx(
                'h-5 w-5  fill-text-label',
                !disabled && 'group-hover:fill-text-main'
            )} />
            <span>Unlink</span>
        </TextButton>
    );
};

export default UnlinkButton;