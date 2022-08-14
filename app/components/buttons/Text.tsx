import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Props = Parameters<typeof Base>[0] & {
    paddings?: string
}

const Text = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className,
        paddings)} {...props} ref={ref} />
))

Text['displayName'] = 'text-button'

export default Text