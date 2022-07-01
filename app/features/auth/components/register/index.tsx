import { Form, useActionData } from "@remix-run/react"
import { useTranslation } from "react-i18next"
import { OutlinedButton } from '~/components/buttons'
import RegistrationForm from './RegistrationForm'

interface ActionData {
    error?: string
}

type Props = {
    confirmed: boolean
}

const Register: React.FC<Props> = ({ confirmed }) => {
    const { t } = useTranslation('common')
    const actionData = useActionData() as ActionData
    return (
        <div className='flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-text-main'>Registration</h1>
            <div className='my-4' />
            {actionData?.error && (
                <p className="text-red-500">{actionData?.error}</p>
            )}
            {confirmed ? (
                <RegistrationForm />
            ) : (
                <div className='my-4 w-[50%]'>
                    <span className='text-text-main'>{t('please-confirm-email')}</span>
                    <span role='img' aria-label='sorry' className="ml-1">🙇‍♂️</span>
                </div>
            )}
            <Form action='/logout' method='post' className='flex w-[50%] flex-col'>
                <OutlinedButton className='mt-2 w-full'>{t('cancel-register')}</OutlinedButton>
            </Form>
        </div>
    )
}

export default Register