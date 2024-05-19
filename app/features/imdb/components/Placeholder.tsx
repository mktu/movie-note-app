import type { FC } from 'react'
import clsx from 'clsx';
import ImdbIcon from './ImdbIcon';

type Props = {
    className?: string
    loading?: boolean,
    error?: string
}

const Placeholder: FC<Props> = ({
    className,
    loading,
    error
}) => {
    return (
        <div className={clsx('flex items-center', className)}>
            {(loading || error) && (
                <>
                    <ImdbIcon className='mr-2 size-10' />
                    <div className='flex items-center text-text-label'>
                        {loading ? 'loading...' : error}
                    </div>
                </>
            )}
        </div>
    );
};

export default Placeholder;