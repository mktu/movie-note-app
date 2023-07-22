import type { FC } from 'react'
import Tag from '~/components/buttons/Tag';


type Props = {
    genres: { name: string, tmdbId: string }[]
}

const Genres: FC<Props> = ({ genres }) => {
    return (
        <div className='flex items-center'>
            {genres.map(v => (
                <Tag key={v.tmdbId}>{v.name}</Tag>
            ))}
        </div>
    );
};

export default Genres;