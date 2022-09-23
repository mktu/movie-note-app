import React from 'react'
import Context from './Context'
import * as localstorage from "@utils/localstorage";
import useLocalstorage from './useLocalstorage';

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const methods = useLocalstorage(localstorage)
    return (
        <Context.Provider value={methods}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider