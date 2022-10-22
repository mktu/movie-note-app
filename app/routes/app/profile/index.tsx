import { EditProfile } from '~/features/profile';
import { action } from '~/features/profile/server/actions/profile.server';
import { loader } from '~/features/profile/server/loaders/profile.server';

import { useActionData, useLoaderData } from '@remix-run/react';

import type { FC } from "react";

export {
    loader,
    action
}

const Profile: FC = () => {
    const { user } = useLoaderData<typeof loader>()
    const { succeeded, error } = useActionData<typeof action>() || {}

    return (
        <EditProfile user={user} error={error} succeeded={succeeded} />
    )
}

export default Profile