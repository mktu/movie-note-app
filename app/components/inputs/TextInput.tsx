import { forwardRef, useState } from 'react'
import type { ReactNode } from 'react'
import Base from './Base'
import clsx from 'clsx'

type Props = Parameters<typeof Base>[0] & {
    addonLeft?: ReactNode,
    addonRight?: ReactNode,
    paddings?: string
}

const TextInput = forwardRef<HTMLInputElement, Props>(({
    className,
    disabled,
    addonRight,
    addonLeft,
    onBlur,
    onFocus,
    paddings = 'p-2',
    ...props }, ref) => {
    const [focus, setFocus] = useState(false)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false)
        onBlur && onBlur(e)
    }
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocus(true)
        onFocus && onFocus(e)
    }
    return (
        <div className={clsx(
            'flex items-center rounded border border-primary-border',
            paddings,
            focus && ' outline outline-focus',
            className
        )}>
            {addonLeft}
            <Base className={clsx(
                'focus:outline-none',
                'focus:bg-white focus:drop-shadow-none',
                addonLeft && 'ml-2',
                addonRight && 'mr-2',
                'w-full')}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props} ref={ref} />
            {addonRight}
        </div>
    )
})

TextInput.displayName = 'text-input'

export default TextInput