import clsx from 'clsx';
import TextareaAutosize from 'react-textarea-autosize';

import type { TextareaAutosizeProps } from 'react-textarea-autosize';
import { forwardRef } from 'react';

const ResizableTextAreaBase = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(({
    className,
    disabled,
    ...props
}, ref) => {
    return (
        <TextareaAutosize ref={ref} disabled={disabled} {...props} className={clsx(className, 'relative w-full outline-none focus:outline-none', disabled ? 'cursor-default opacity-25' : '')} />
    )
})

ResizableTextAreaBase['displayName'] = 'resizable-text-area-base'

export default ResizableTextAreaBase