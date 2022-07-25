import type { ComponentStory, ComponentMeta } from '@storybook/react';

import Detail from '.';

export default {
    title: 'app/movie-note/Detail',
    component: Detail,
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail {...args} />;

export const Default = Template.bind({});

const detailBase = {
    id: '280',
    title: 'ターミネーター2',
    release_date: '1991-07-03',
    status: 'Released',
    overview: '未来からの抹殺兵器ターミネーターを破壊し、近未来で恐ろしい戦争が起こる事を知ってしまったサラ・コナー。カイルとの子供ジョンは母親から常にその戦争の話や戦いへの備えの話を聞かされていた。サラは周囲から変人扱いされ精神病院へ収容されジョンは親戚の家で暮らしていた。ある日ジョンの前に執拗にジョンを狙う不審な警官が現る。軌道を逸した警官の行動は明らかにジョンを殺害しようとしていた。殺されるその寸前、見知らぬ屈強な男が現れジョンを救う。彼は自らをターミネーターでありジョンを守るべく再プログラムされ未来から送り込まれたと告げる。ジョン',
    poster_path: '/ghKQ6it5j7KjdYghT5EDthVNXlD.jpg',
    backdrop_path: '/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg',
    genres: [
        {
            "id": 28,
            "name": "アクション"
        },
        {
            "id": 53,
            "name": "スリラー"
        },
        {
            "id": 878,
            "name": "サイエンスフィクション"
        }
    ],
    homepage: '',
    imdb_id: 'tt0103064',
}

Default.args = {
    detail: detailBase
};

export const NoImage = Template.bind({});

NoImage.args = {
    detail: {
        ...detailBase,
        poster_path: '',
        backdrop_path: ''
    }
};