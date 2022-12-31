import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

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