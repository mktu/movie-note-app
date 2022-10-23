import React from "react";
import type { UserType } from "~/features/profile/server/db/user.server";

const context = React.createContext<UserType>({
    id: '',
    created_at: '',
    name: '',
    image: '',
    comment: '',
    auth_id: ''
});

export default context;