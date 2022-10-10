import type { User } from '@type-defs/backend';
import type { FC } from 'react'

type Props = {
    user: User
}

const Edit: FC<Props> = ({
    user
}) => {
    return (
        <div className=''>
            <div>{user.name}</div>
            <div>{user.comment}</div>
            <div>{user.image} </div>
        </div>
    );
};

export default Edit;