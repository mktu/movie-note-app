import clsx from "clsx"
import { forwardRef } from "react"

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Base = forwardRef<HTMLInputElement, Props>(({ className, disabled, ...props }, ref) => (
    <input disabled={disabled}
        type='text'
        className={clsx(
            className,
            'outline-none focus:outline-none',
            disabled && 'cursor-default opacity-25')} {...props} ref={ref} />
))

Base['displayName'] = 'input-base'

export default Base