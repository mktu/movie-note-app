import type { User } from '@type-defs/backend';
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { RegistrationForm } from '../components/register-form';

type Props = {
    user: User,
    error?: string,
    succeeded?: boolean
}

const Edit: FC<Props> = ({
    user,
    error,
    succeeded
}) => {
    const { t } = useTranslation('common')
    useEffect(() => {
        if (succeeded) {
            toast.success(t('update-succeeded'))
        }
    }, [succeeded, t])
    return (
        <RegistrationForm nickname={user.name} comment={user.comment} image={user.image} error={error} />
    )
};

export default Edit;