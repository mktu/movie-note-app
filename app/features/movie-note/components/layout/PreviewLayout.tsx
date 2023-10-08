import type { FC, ReactNode } from 'react'

type Props = {
    header: ReactNode,
    children?: ReactNode,
}

const PreviewLayout: FC<Props> = ({
    header,
    children
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 py-5'>
            <div className='px-10'>{header}</div>
            <div className='rounded-lg border-t border-dashed border-border-dark p-6'>
                <div className='min-h-[512px]'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PreviewLayout;