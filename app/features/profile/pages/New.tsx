import { useTranslation } from "react-i18next"
import { RegistrationForm } from '../components/register-form'

type Props = {
    confirmed: boolean,
    error?: string,
    onCancel: () => void
}

const New: React.FC<Props> = ({ confirmed, error, onCancel }) => {
    const { t } = useTranslation('common')
    return (
        <div className='flex size-full flex-col items-center justify-center'>
            {confirmed ? (
                <RegistrationForm
                    singleColumn
                    error={error}
                    handleCancel={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onCancel()
                    }} />
            ) : (
                <div className='my-4 w-1/2'>
                    <span className='text-text-main'>{t('please-confirm-email')}</span>
                    <span role='img' aria-label='sorry' className="ml-1">🙇‍♂️</span>
                </div>
            )}
        </div>
    )
}

export default New