import { createContext, forwardRef, useContext } from 'react';

export type NavigatorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string,
}

export const Navigator = forwardRef<HTMLAnchorElement, NavigatorProps>(({ children, to, className, ...props }, ref) => (
    <a href={to} ref={ref} className={className} {...props}>{children}</a>
))
Navigator['displayName'] = 'navigator'

export const useNavigator = () => {
    return {
        navigate: (path: string) => { console.log('dummy') }
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