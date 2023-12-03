import type { FC } from 'react'
import Base from './Base';
import clsx from 'clsx';

const Colors = {
    gray: 'bg-tag-main text-text-main',
    blue: 'bg-blue-500 text-white'
} as const

type Props = {
    children: React.ReactNode,
    onClick: () => void,
    color?: keyof (typeof Colors)
}


const Indicator: FC<Props> = ({
    children,
    onClick,
    color = 'gray'
}) => {
    return (
        <Base onClick={onClick} className="flex flex-wrap justify-center space-x-2">
            <span className={clsx('flex w-max cursor-pointer rounded-full px-4 py-2 text-sm font-semibold', Colors[color])}>
                <span>{children}</span>
            </span>
        </Base>
    );
};

export default Indicator;