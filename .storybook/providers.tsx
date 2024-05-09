import React from 'react'
import NavigatorProvider from '../app/providers/navigator/Provider'
import FormProvider from '../app/providers/form/Provider'

const providerDecorator = (StoryFn: Function) => {
    return (
        <NavigatorProvider>
            <FormProvider>
                <StoryFn />
            </FormProvider>
        </NavigatorProvider>
    )
}

export default providerDecorator