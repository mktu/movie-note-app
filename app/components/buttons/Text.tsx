import clsx from "clsx"
import { forwardRef } from "react"
import Base from './Base'

type Theme = 'none' | 'text' | 'label' | 'destructive'

const getColors: (enabled: boolean) => { [t in Theme]: string } = (enabled) => ({
    none: '',
    text: `text-text-main ${enabled && 'hover:text-text-dark focus:text-text-dark'}`,
    label: `text-text-label ${enabled && 'hover:text-text-main focus:text-text-main'}`,
    destructive: `text-destructive-light ${enabled && 'hover:text-destructive-main focus:text-destructive-main'}`
})

type Props = Parameters<typeof Base>[0] & {
    paddings?: string,
    theme?: Theme
}

const Text = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'py-2 px-4',
    theme = 'none',
    className,
    disabled,
    ...props
}, ref) => (
    <Base disabled={disabled} className={clsx(className, getColors(!disabled)[theme],
        paddings)} {...props} ref={ref} />
))

Text['displayName'] = 'text-button'

export default Text