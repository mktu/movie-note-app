import type { FC } from 'react'
import Image from '~/components/placeholders/Image';
type Props = {
    url: string
}
const Error: FC<Props> = ({ url }) => {
    return (
        <div className='flex gap-2'>
            <Image className='text-text-disabled' alt='No Image' width={100 * 1.91} height={100} />
            <div>
                <div className='flex items-center gap-1'>
                    <a href={url} className='underline'>{url}</a>
                </div>
            </div>
        </div>
    );
};

export default Error;