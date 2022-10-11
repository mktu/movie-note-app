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
        <div className='flex h-full w-full flex-col justify-center p-8'>
            <div className='my-4' />
            {error && (
                <p className="text-red-500">{error}</p>
            )}
            <RegistrationForm nickname={user.name} comment={user.comment} />
        </div>
    )
};

export default Edit;