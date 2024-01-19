import type { FC, ReactNode } from 'react'

type Props = {
    header: ReactNode,
    note: ReactNode,
}

const PreviewLayout: FC<Props> = ({
    header,
    note,
}) => {
    return (
        <div className='relative flex w-full flex-col gap-2 py-5'>
            <div className='w-full border-b border-border-main px-10 py-5'>{header}</div>
            {note}
        </div>
    );
};

export default PreviewLayout;