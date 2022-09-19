import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import Switch from './Switch';

const Wrapper = () => {
    const [enabled, setEnabled] = useState(false)
    return <Switch {...{ enabled, setEnabled }} label='テスト有効' />
}

export default {
    title: 'Common/Switch',
    component: Wrapper,
} as ComponentMeta<typeof Wrapper>;

const Template: ComponentStory<typeof Wrapper> = () => <Wrapper />;

export const Primary = Template.bind({});