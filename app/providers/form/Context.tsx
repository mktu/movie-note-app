import type { FC, ReactNode } from "react";
import { createContext, useContext } from "react"

export type FormProps = {
    method: "get" | "post" | "put" | "patch" | "delete",
    action?: string,
    children: ReactNode,
    className?: string,
    encType?: "application/x-www-form-urlencoded" | "multipart/form-data";
}

export const Form: FC<FormProps> = ({
    method,
    children,
    className,
    action,
    encType
}) => {
    return (
        <form action={action} method={method} className={className} encType={encType}>{children}</form>
    )
}

type TransitionState = 'idle' | 'submitting' | 'loading'

export const useTransitionState = () => {
    return 'idle' as TransitionState
}

export type ContextType = {
    form: typeof Form,
    useTransitionState: typeof useTransitionState
}

const context = createContext<ContextType>({
    form: Form,
    useTransitionState
})

export const useFormContext = () => useContext(context)

export default context;