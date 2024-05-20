import clsx from 'clsx';
import type { FC } from 'react'
import Info from '~/components/icons/Info'

type Props = {
    error: string,
    className?: string
}

const Error: FC<Props> = ({
    error,
    className
}) => {
    return (
        <div className={clsx("flex items-center px-2 text-sm text-error-main", className)}>
            <Info className='mr-1 size-5 fill-error-main' />
            <span>{error}</span>
        </div>
    );
};

export default Error;