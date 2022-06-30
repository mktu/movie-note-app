import clsx from 'clsx'
import { forwardRef } from 'react'
import Base from './Base'

type Props = Parameters<typeof Base>[0]

const Icon = forwardRef<HTMLButtonElement, Props>(({
    className,
    disabled,
    ...props
}, ref) => (
    <Base ref={ref} className={clsx(className)} disabled={disabled} disabledStyle='cursor-default' {...props} />
))

Icon.displayName = 'contained-button'

export default Icon