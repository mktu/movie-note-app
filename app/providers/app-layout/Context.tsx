import React, { useContext } from "react";
import type { useAppLayout } from './useAppLayout';

export type AppLayoutType = ReturnType<typeof useAppLayout>
const context = React.createContext<AppLayoutType>({
    setOpenMobileMenu: () => { },
    openMobileMenu: false
});

export const useAppLayoutContext = () => useContext(context)

export default context;