import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import Context from './Context'
import type { ContextType, NavigatorProps } from './Context'
import { useNavigate, NavLink } from '@remix-run/react'

type Props = {
    children: ReactNode,
}

export const Navigator = forwardRef<HTMLAnchorElement, NavigatorProps>(({ to, children, className, ...props }, ref) => {
    return (
        <NavLink ref={ref} className={className} to={to} {...props}>{children}</NavLink>
    )
})

Navigator['displayName'] = 'navigator'

const useNavigator = () => {
    const navigate = useNavigate()
    return {
        navigate
    }
}


const RemixProvider: React.FC<Props> = ({ children }) => {
    const value: ContextType = {
        navigator: Navigator,
        useNavigator
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default RemixProvider