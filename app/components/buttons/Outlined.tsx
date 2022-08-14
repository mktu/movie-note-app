import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Props = Parameters<typeof Base>[0] & {
    paddings?: string,
    rounded?: string
}

const Outlined = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    rounded = 'rounded',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className,
        rounded,
        paddings,
        'hover:bg-surface-hover',
        'border border-primary-border')} {...props} ref={ref} />
))

Outlined['displayName'] = 'contained-button'

export default Outlined