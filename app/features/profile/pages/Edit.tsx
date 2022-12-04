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
    const msg = t('update-succeeded')
    useEffect(() => {
        if (succeeded) {
            toast.success(msg)
        }
    }, [succeeded, msg])
    return (
        <div>
            <RegistrationForm nickname={user.name} comment={user.comment} image={user.image} error={error} />
        </div>
    )
};

export default Edit;