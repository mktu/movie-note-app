import type { FC } from 'react'
import { Form, Link, useNavigation } from '@remix-run/react'
import { ContainedButton } from '~/components/buttons'
import { TextInput } from '~/components/inputs'
import UserIcon from '~/components/icons/User'
import LockIcon from '~/components/icons/Lock'
import ValidationTransition from '../../../../components/transitions/ValidationTransition'
import useRegisterForm from '../../hooks/useRegisterForm'
import { useTranslation } from 'react-i18next'

const Login: FC<{ errorKey?: string }> = ({ errorKey }) => {
    const { t } = useTranslation('common')
    const { email, password, errors, valid } = useRegisterForm()
    const navigation = useNavigation()
    return (
        <div className='flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-text-main'>Sign Up</h1>
            <div className='my-4' />
            <Form className='flex w-[50%] flex-col items-center' method='post'>
                <ValidationTransition className='mt-2 w-full text-sm text-error-main' show={Boolean(errorKey)}>
                    {errorKey && t(errorKey)}
                </ValidationTransition>
                <TextInput
                    title="must be alphanumeric in 6-12 chars"
                    addonLeft={<UserIcon className='h-4 w-4 fill-text-label' />}
                    className='mt-5 w-full' aria-label={email.name} id={email.name} placeholder={t('register-email')}
                    {...email}
                />
                <ValidationTransition className='mt-2 w-full text-sm text-error-main' show={Boolean(errors[email.name])}>
                    {errors[email.name]?.message?.toString()}
                </ValidationTransition>
                <TextInput
                    addonLeft={<LockIcon className='h-4 w-4 fill-text-label' />}
                    className='mt-5 w-full' aria-label={password.name} id={password.name} placeholder={t('register-password')}
                    {...password}
                />
                <ValidationTransition className='mt-2 w-full text-sm text-error-main' show={Boolean(errors[password.name])}>
                    {errors[password.name]?.message?.toString()}
                </ValidationTransition>
                <ContainedButton id='login' disabled={!valid || navigation.state !== 'idle'} className='mt-5 w-full'>{t('register')}</ContainedButton>
            </Form>
            <div className='my-4 text-sm'>
                <span className='mr-2 text-text-main'>{t('has-no-account')}</span>
                <Link to='/login'>{t('login')}</Link>
            </div>
        </div>
    )
}

export default Login