import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Props = Parameters<typeof Base>[0] & {
    paddings?: string,
    rounded?: string,
    border?: string,
}

const Outlined = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    rounded = 'rounded',
    border = 'border border-primary-border',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className,
        rounded,
        paddings,
        border,
        'hover:bg-surface-hover')} {...props} ref={ref} />
))

Outlined['displayName'] = 'outlined-button'

export default Outlined