import React, { useContext } from "react";
import type { UserType } from "~/features/profile/server/db/user.server";

const context = React.createContext<UserType | null>(null);

export const useUserContext = () => useContext(context)

export default context;