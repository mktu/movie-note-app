import type { FC } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { RegistrationForm } from '../components/register-form';

import type { UserType } from '../server/db/user.server';

type Props = {
    user: UserType,
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