import React from 'react'
import NavigatorProvider from '../app/providers/navigator/Provider'

const providerDecorator = (StoryFn: Function) => {
    return (
        <NavigatorProvider>
            <StoryFn />
        </NavigatorProvider>
    )
}

export default providerDecorator