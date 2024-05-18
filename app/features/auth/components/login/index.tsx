import type { FC } from 'react'
import { Form, Link, useNavigation } from '@remix-run/react'
import { ContainedButton } from '~/components/buttons'
import { TextInput } from '~/components/inputs'
import UserIcon from '~/components/icons/User'
import LockIcon from '~/components/icons/Lock'
import GoogleLogin from './GoogleLogin'
import useLoginForm from '../../hooks/useLoginForm'
import ValidationTransition from '../../../../components/transitions/ValidationTransition'
import { useTranslation } from 'react-i18next'

const Login: FC<{ errorKey?: string }> = ({ errorKey }) => {
    const { t } = useTranslation('common')
    const navigation = useNavigation();
    const { email, password, errors, valid } = useLoginForm()
    return (
        <div className='flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-text-main'>Log In</h1>
            <div className='my-4' />
            <Form className='flex w-[50%] flex-col items-center' method='post'>
                <ValidationTransition className='text-error-main mt-2 w-full text-sm' show={Boolean(errorKey)}>
                    {errorKey && t(errorKey)}
                </ValidationTransition>
                <TextInput
                    title="must be alphanumeric in 6-12 chars"
                    addonLeft={<UserIcon className='fill-text-label h-4 w-4' />}
                    className='mt-5 w-full' aria-label={email.name} id={email.name} placeholder={t('input-email')}
                    {...email}
                />
                <ValidationTransition className='text-error-main mt-2 w-full text-sm' show={Boolean(errors[email.name])}>
                    {errors[email.name]?.message?.toString()}
                </ValidationTransition>
                <TextInput
                    addonLeft={<LockIcon className='fill-text-label h-4 w-4' />}
                    className='mt-5 w-full' aria-label={password.name} id={password.name} placeholder={t('input-password')}
                    {...password}
                />
                <ValidationTransition className='text-error-main mt-2 w-full text-sm' show={Boolean(errors[password.name])}>
                    {errors[password.name]?.message?.toString()}
                </ValidationTransition>
                <ContainedButton id='login' disabled={!valid || navigation.state !== 'idle'} className='mt-5 w-full'>{t('login')}</ContainedButton>
            </Form>
            <div className='my-4 flex min-w-[50%] items-center'>
                <div className='border-primary-border w-full border-t-2' />
                <div className='text-text-label mx-2'>OR</div>
                <div className='border-primary-border w-full border-t-2' />
            </div>
            <Form action="/auth/google" method="post">
                <GoogleLogin id='google-login' />
            </Form>
            <div className='my-4 text-sm'>
                <span className='text-text-main mr-2'>{t('has-no-account')}</span>
                <Link to='/signup'>{t('register')}</Link>
            </div>
        </div>
    )
}

export default Login