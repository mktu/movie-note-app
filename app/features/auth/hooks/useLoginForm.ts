import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const useRegisterForm = () => {
    const { t } = useTranslation('common')
    const { register, watch, formState: { errors } } = useForm({mode : 'onBlur'});
    const email = register('email', {
        pattern: {
            value: /\S+@\S+\.\S+/,
            message: t('email-validation'),
        }
    })
    const password = register('password', {
        required: t('required'),
    })
    const valid = watch('email') && watch('password') && Object.keys(errors).length === 0
    return {
        register,
        watch,
        errors,
        email,
        password,
        valid
    }
}

export default useRegisterForm