import clsx from 'clsx';
import type { FC, ReactNode } from 'react'

type Props = {
    error?: string,
    children: ReactNode,
    className?: string
}

const InputError: FC<Props> = ({ children, error, className }) => {
    return (
        <div className={clsx('flex flex-col gap-1', className)}>
            {children}
            {error && <p className='px-2 text-sm text-error-main'>{error}</p>}
        </div>
    );
};

export default InputError;