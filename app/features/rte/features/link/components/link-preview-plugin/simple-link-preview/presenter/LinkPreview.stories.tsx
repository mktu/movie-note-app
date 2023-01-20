import type { ComponentStory, ComponentMeta } from '@storybook/react';

import LinkPreview from './LinkPreview';

export default {
    title: 'features/rte/LinkPreview',
    component: LinkPreview,
} as ComponentMeta<typeof LinkPreview>;

const Template: ComponentStory<typeof LinkPreview> = (args) => <LinkPreview {...args} />;

export const Default = Template.bind({});

Default.args = {
    ogp: {
        title: 'Next.js by Vercel - The React Framework',
        description: 'Production grade React applications that scale. The world’s leading companies use Next.js by Vercel to build static and dynamic websites and web applications.',
        image: 'https://assets.vercel.com/image/upload/v1662090959/front/nextjs/twitter-card.png',
        date: '2020-02-20 10:10:11',
        author: 'mktu',
        logo: 'https://assets.vercel.com/image/upload/v1662090959/front/nextjs/twitter-card.png',
        url: 'https://nextjs.org/'
    },
    onClickRemove: () => { },
    url: 'https://nextjs.org/'
};

export const LongText = Template.bind({});

LongText.args = {
    ogp: {
        title: '【ポケモンSV】カイリューの育成論と対策｜おすすめ技構成【スカーレットバイオレット】 - アルテマ", author: "名前",…',
        description: 'ポケモンSV(スカーレットバイオレット)のカイリュー育成論です。おすすめ技構成や努力値振り、性格、持ち物を型ごとに考察し、カイリューへの対策も記載しています。飛行テラスタルやほのおのうずカイリューの作り方も記載してるので、育成の参考にしてください。',
        image: 'https://img.altema.jp/pokemonsv/uploads/2022/11/2022y11m29d_1225578378.jpg',
        date: '2020-02-20 10:10:11',
        author: 'mktu',
        logo: 'https://img.altema.jp/common/altema-touch-icon.png',
        url: 'https://altema.jp/pokemonsv/kairyuikusei?tw=1674126153'
    },
    onClickRemove: () => { },
    url: 'https://nextjs.org/'
};


export const Loading = Template.bind({});

Loading.args = {
    onClickRemove: () => { },
    loading: true,
    url: 'https://nextjs.org/'
};

export const Error = Template.bind({});

Error.args = {
    onClickRemove: () => { },
    error: 'test',
    url: 'https://nextjs.org/'
};

