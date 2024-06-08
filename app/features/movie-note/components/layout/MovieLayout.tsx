import type { FC, ReactNode } from 'react'

type Props = {
    header: ReactNode,
    footer?: ReactNode,
    note?: ReactNode,
}

const MovieLayout: FC<Props> = ({
    header,
    footer,
    note,
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2'>
            {header}
            {note && (
                <div className='rounded-lg border-t border-dashed border-border-dark p-6'>
                    <div className='min-h-[512px]'>
                        {note}
                    </div>
                </div>
            )}
            {footer}
        </div>
    );
};

export default MovieLayout;