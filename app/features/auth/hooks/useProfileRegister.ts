import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const useProfileRegister = () => {
    const { t } = useTranslation('common')
    const { register, watch, formState: { errors } } = useForm({mode : 'onBlur'});
    const nickname = register('nickname', {
        required: t('required'),
    })
    const valid = watch('nickname') && Object.keys(errors).length === 0
    return {
        register,
        watch,
        errors,
        nickname,
        valid,
    }
}

export default useProfileRegister