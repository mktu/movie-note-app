import React from 'react'
import NavigatorProvider from '../app/providers/navigator/Provider'
import FormProvider from '../app/providers/form/Provider'
import { RecoilRoot } from 'recoil';

const providerDecorator = (StoryFn: Function) => {
    return (
        <RecoilRoot>
            <NavigatorProvider>
                <FormProvider>
                    <StoryFn />
                </FormProvider>
            </NavigatorProvider>
        </RecoilRoot>
    )
}

export default providerDecorator