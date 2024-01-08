import clsx from 'clsx';
import React, { forwardRef } from 'react';

import ResizableTextAreaBase from './ResizableTextAreaBase';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof ResizableTextAreaBase> & {
    clear?: React.ReactNode,
    className?: string
    paddings?: string,
    border?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({
    id,
    paddings = 'p-2',
    border = 'rounded border border-primary-border',
    className,
    clear,
    ...props
}, ref) => {
    return (
        <div className={clsx(
            'relative flex items-center outline-focus focus-within:outline',
            paddings,
            border,
            className)}>
            <ResizableTextAreaBase ref={ref} id={id} {...props} className='resize-none bg-surface-main placeholder:text-text-label' />
        </div>
    )
})

TextArea['displayName'] = 'text-area'

export default TextArea