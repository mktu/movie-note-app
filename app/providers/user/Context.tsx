import React from "react";
import type { User } from "@type-defs/index";

const context = React.createContext<User>({
    id : '',
    created_at : 0
});

export default context;