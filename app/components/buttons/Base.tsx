import clsx from "clsx"
import { forwardRef } from "react"

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    disabledStyle?: string
}

const Base = forwardRef<HTMLButtonElement, Props>(({ className, disabled, disabledStyle = 'cursor-default opacity-25', ...props }, ref) => (
    <button disabled={disabled} className={clsx(
        className,
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-focus',
        disabled && disabledStyle)} {...props} ref={ref} />
))
Base['displayName'] = 'base-button'

export default Base