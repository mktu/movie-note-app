import { createContext, forwardRef, useContext } from 'react';

import type { ReactNode } from "react";

export type NavigatorProps = {
    children: ReactNode,
    to: string,
    className?: string
}

export const Navigator = forwardRef<HTMLAnchorElement, NavigatorProps>(({ children, to, className }, ref) => (
    <a href={to} ref={ref} className={className} >{children}</a>
))
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

export const useNavigatorContext = () => useContext(context)

export default context;