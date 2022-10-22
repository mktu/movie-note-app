import clsx from 'clsx';
import React, { forwardRef } from 'react';

import ResizableTextAreaBase from './ResizableTextAreaBase';

import type { ComponentProps } from 'react';

type Props = ComponentProps<typeof ResizableTextAreaBase> & {
    clear?: React.ReactNode,
    className?: string
    paddings?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(({
    id,
    paddings = 'p-2',
    className,
    clear,
    ...props
}, ref) => {
    return (
        <div className={clsx(
            'relative flex items-center rounded border border-primary-border outline-focus focus-within:outline',
            paddings,
            className)}>
            <ResizableTextAreaBase ref={ref} id={id} {...props} className='resize-none bg-surface-main placeholder:text-text-label' />
        </div>
    )
})

TextArea['displayName'] = 'text-area'

export default TextArea