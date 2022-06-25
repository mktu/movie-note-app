import type { FC } from 'react'
import { Form, Link } from '@remix-run/react'
import { ContainedButton } from '~/components/buttons'
import { TextInput } from '~/components/inputs'
import UserIcon from '~/components/icons/User'
import LockIcon from '~/components/icons/Lock'
import GoogleLogin from './GoogleLogin'
import useLoginForm from '../../hooks/useLoginForm'
import { useTranslation } from 'react-i18next'

const Login: FC = () => {
    const { t } = useTranslation('common')
    const { email, password, errors, valid } = useLoginForm()
    console.log(errors)
    return (
        <div className='flex flex-col items-center justify-center h-full w-full'>
            <h1 className='text-text-main'>Log In</h1>
            <div className='my-4' />
            <Form className='min-w-[50%] flex flex-col items-center' method='post'>
                <TextInput
                title="must be alphanumeric in 6-12 chars"
                    addonLeft={<UserIcon className='fill-text-label w-4 h-4' />}
                    className='mt-5 w-full' aria-label={email.name} id={email.name} placeholder={t('input-email')}
                    {...email}
                    />
                {errors[email.name] && (
                    <div className='text-sm text-error-main mt-2 w-full'>{errors[email.name]?.message?.toString()}</div>
                )}
                <TextInput
                    addonLeft={<LockIcon className='fill-text-label w-4 h-4' />}
                    className='mt-5 w-full' aria-label={password.name} id={password.name} placeholder={t('input-password')}
                    {...password}
                    />
                {errors[password.name] && (
                    <div className='text-sm text-error-main mt-2 w-full'>{errors[password.name]?.message?.toString()}</div>
                )}
                <ContainedButton id='login' disabled={!valid} className='w-full mt-5'>{t('login')}</ContainedButton>
            </Form>
            <div className='min-w-[50%] flex items-center my-4'>
                <div className='border-t-2 border-primary-border w-full' />
                <div className='text-text-label mx-2'>OR</div>
                <div className='border-t-2 border-primary-border w-full' />
            </div>
            <Form action="/auth/google" method="post">
                <GoogleLogin id='google-login'/>
            </Form>
            <div className='text-sm my-4'>
                <span className='text-text-main mr-2'>{t('has-no-account')}</span>
                <Link to='/signup'>{t('register')}</Link>
            </div>
        </div>
    )
}

export default Login