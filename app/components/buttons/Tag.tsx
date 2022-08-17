import type { FC, ReactNode } from 'react'
import { IconButton } from '../buttons'
import XIcon from '../icons/X'

type Props = {
    children: ReactNode,
    removable?: boolean
}

const Tag: FC<Props> = ({ children, removable }) => {
    return (
        <div className="flex flex-wrap justify-center space-x-2">
            <span className="ease flex w-max cursor-pointer rounded-full bg-tag-main px-4 py-2 text-sm font-semibold text-text-main transition duration-300 active:bg-tag-active">
                <span>{children}</span>
                {removable && (
                    <IconButton name='clear' className="hover ml-1 bg-transparent focus:outline-none">
                        <XIcon className='h-5 w-5 stroke-text-main' />
                    </IconButton>
                )}
            </span>
        </div>

    );
};

export default Tag;