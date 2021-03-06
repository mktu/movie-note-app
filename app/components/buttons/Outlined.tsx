import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Props = Parameters<typeof Base>[0] & {
    paddings?: string
}

const Outlined = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className,
        'rounded',
        paddings,
        'border border-primary-border')} {...props} ref={ref} />
))

Outlined.displayName = 'contained-button'

export default Outlined