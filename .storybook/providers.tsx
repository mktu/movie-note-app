import React from 'react'
import { RecoilRoot } from 'recoil'
import NavigatorProvider from '../app/providers/navigator/Provider'
import FormProvider from '../app/providers/form/Provider'
import { StoryFn } from '@storybook/react'

const providerDecorator = (StoryFn: StoryFn) => {
    return (
        <NavigatorProvider>
            <FormProvider>
                <RecoilRoot>
                    <StoryFn />
                </RecoilRoot>
            </FormProvider>
        </NavigatorProvider>
    )
}

export default providerDecorator