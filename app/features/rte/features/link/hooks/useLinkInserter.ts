import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { urlRegex } from "../../../utils/validateUrl";

type Props = {
    initLabel?: string,
    initUrl?: string
}

const useLinkInserter = ({ initLabel, initUrl }: Props) => {
    const { t } = useTranslation('common')
    const { register, watch, formState: { errors }, handleSubmit } = useForm({ mode: 'onChange' });
    const registerLabel = register('label', {
        value: initLabel,
        required: t('required'),
    })
    const registerUrl = register('url', {
        value: initUrl,
        required: t('required'),
        pattern: {
            value: urlRegex,
            message: t('url-validation'),
        }

    })
    const label = watch('label')
    const url = watch('url')
    const valid = label && url && Object.keys(errors).length === 0
    return {
        register,
        watch,
        errors,
        registerLabel,
        registerUrl,
        valid,
        label,
        url,
        handleSubmit
    }
}

export default useLinkInserter