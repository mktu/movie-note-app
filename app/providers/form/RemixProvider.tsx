import type { FC } from 'react';
import React from 'react';

import { Form as RemixForm, useNavigation } from '@remix-run/react';

import Context from './Context';

import type { ContextType, FormProps } from './Context'

type Props = {
    children: React.ReactNode,
}

export const Form: FC<FormProps> = ({ action, method, children, className, encType }) => {
    return (
        <RemixForm className={className} action={action} method={method} encType={encType}>{children}</RemixForm>
    )
}

Form['displayName'] = 'form'

const useTransitionState = () => {
    const navigation = useNavigation()
    return navigation.state
}


const RemixProvider: React.FC<Props> = ({ children }) => {
    const value: ContextType = {
        form: Form,
        useTransitionState
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default RemixProvider