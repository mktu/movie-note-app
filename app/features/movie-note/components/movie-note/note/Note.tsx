import clsx from 'clsx';
import type { FC } from 'react'
import Editor from './lexical'

type Props = {
    className?: string
}

const Note: FC<Props> = ({
    className
}) => {
    return (
        <div className={clsx('relative', className)}>
            <Editor />
        </div>)
};

export default Note;