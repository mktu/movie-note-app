import React from 'react'
import Context from './Context'
import useLocalstorage from './useLocalstorage';

type Props = {
    children: React.ReactNode,
    init: Parameters<typeof useLocalstorage>[0]
}

const DefaultProvider: React.FC<Props> = ({ children, init }) => {
    const methods = useLocalstorage(init)
    return (
        <Context.Provider value={methods}>
            {children}
        </Context.Provider>
    )
}

export default DefaultProvider