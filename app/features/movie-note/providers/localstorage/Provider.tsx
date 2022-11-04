import React from 'react'
import Context from './Context'
import useLocalstorage from './useLocalstorage';

type Props = {
    children: React.ReactNode,
}

const DefaultProvider: React.FC<Props> = ({ children }) => {
    const methods = useLocalstorage()
    return (
        <Context.Provider value={methods}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider