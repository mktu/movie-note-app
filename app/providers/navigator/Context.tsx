import { createContext } from 'react';

import type { FC, ReactNode } from "react";

export type NavigatorProps = {
    children: ReactNode,
    to: string,
    className?: string
}

export const Navigator: FC<NavigatorProps> = ({ children, to, className }) => (
    <a href={to} className={className} >{children}</a>
)
Navigator.displayName = 'navigator'

export const useNavigator = () => {
    return {
        navigate: (path: string) => { }
    }
}

export type ContextType = {
    navigator: typeof Navigator,
    useNavigator: typeof useNavigator
}

const context = createContext<ContextType>({
    navigator: Navigator,
    useNavigator
});

export default context;