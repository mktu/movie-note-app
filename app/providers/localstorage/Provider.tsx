import React from 'react'
import Context from './Context'
import * as localstorage from "@utils/localstorage";
import dummystorage from "@utils/localstorage/dummystorage";
import useLocalstorage from './useLocalstorage';

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const isSsr = typeof localStorage === 'undefined'
    const methods = useLocalstorage(isSsr ? dummystorage : localstorage)
    return (
        <Context.Provider value={methods}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider