import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Args = {
    nickname?: string,
    comment?: string
}

const useProfileRegister = (args: Args) => {
    const { t } = useTranslation('common')
    const { register, watch, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const nickname = register('nickname', {
        required: t('required'),
        value: args.nickname || ''
    })
    const comment = register('comment', {
        value: args.comment || ''
    })

    const valid = isValid && Object.keys(errors).length === 0
    return {
        register,
        watch,
        errors,
        nickname,
        valid,
        comment
    }
}

export default useProfileRegister