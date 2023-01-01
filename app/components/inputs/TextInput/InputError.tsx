import type { FC, ReactNode } from 'react'

type Props = {
    error?: string,
    children: ReactNode
}

const InputError: FC<Props> = ({ children, error }) => {
    return (
        <div className='flex flex-col gap-1'>
            {children}
            {error && <p className='text-error-main text-sm px-2'>{error}</p>}
        </div>
    );
};

export default InputError;