import type { User } from '@type-defs/backend';
import type { FC } from 'react'
import { RegistrationForm } from '../components/register-form';

type Props = {
    user: User,
    error?: string
}

const Edit: FC<Props> = ({
    user,
    error
}) => {
    return (
        <div>
            {error && (
                <p className="text-red-500">{error}</p>
            )}
            <RegistrationForm nickname={user.name} comment={user.comment} image={user.image} />
        </div>
    )
};

export default Edit;