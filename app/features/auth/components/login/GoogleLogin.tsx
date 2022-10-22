import clsx from "clsx"
import { forwardRef } from "react"
import Base from '~/components/buttons/Base'

type Props = Parameters<typeof Base>[0] & {
    paddings?: string
}

const GoogleLogin = forwardRef<HTMLButtonElement, Props>(({
    paddings = 'pr-4',
    className,
    ...props
}, ref) => (
    <Base className={clsx(className,
        'flex items-center',
        paddings,
        'rounded border border-primary-border')} {...props} ref={ref}>
        <img src='/GoogleSignin.svg' alt='google-sign-in' />
        <span className='inline-block text-text-label' style={{
            fontFamily: 'Roboto'
        }}>Sign in with Google</span>
    </Base>
))

GoogleLogin['displayName'] = 'google-login-button'

export default GoogleLogin