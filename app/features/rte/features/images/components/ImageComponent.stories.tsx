import type { ComponentStory, ComponentMeta } from '@storybook/react';

import ImageComponent from './ImageComponent';

export default {
    title: 'features/rte/Image',
    component: ImageComponent,
} as ComponentMeta<typeof ImageComponent>;

const Template: ComponentStory<typeof ImageComponent> = (args) => <ImageComponent {...args} />;

export const Default = Template.bind({});

Default.args = {
    src: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2//3Vc8VSWzB5QyVkgTBhIBCKoptu.jpg',
    width: 300,
    height: 450,
    altText: 'test'
};

