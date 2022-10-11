import { useTranslation } from "react-i18next"
import { OutlinedButton } from '~/components/buttons'
import { useFormContext } from "~/providers/form/Context"
import { RegistrationForm } from '../components/register-form'

type Props = {
    confirmed: boolean,
    error?: string
}

const New: React.FC<Props> = ({ confirmed, error }) => {
    const { t } = useTranslation('common')
    const { form: Form } = useFormContext()
    return (
        <div className='flex h-full w-full flex-col items-center justify-center'>
            <h1 className='text-text-main'>{t('registration')}</h1>
            <div className='my-4' />
            {error && (
                <p className="text-red-500">{error}</p>
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

export default New