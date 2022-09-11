import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Theme = 'none' | 'text' | 'label'

const colors: { [t in Theme]: string } = {
    none: '',
    text: 'text-text-main hover:text-text-dark focus:text-text-dark',
    label: 'text-text-label hover:text-text-main focus:text-text-main'
}

type Props = Parameters<typeof Base>[0] & {
    paddings?: string,
    theme?: Theme
}



const Text = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    theme = 'none',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className, colors[theme],
        paddings)} {...props} ref={ref} />
))

Text['displayName'] = 'text-button'

export default Text