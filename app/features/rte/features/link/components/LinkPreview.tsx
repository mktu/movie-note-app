import type { FC } from 'react'
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';
import useOgp from '../hooks/useOgp';

type Props = {
    url: string
}

const LinkPreview: FC<Props> = ({
    url
}) => {
    const { ogp } = useOgp(url)
    return (
        <div className='relative flex items-center gap-1'>
            <IconButton name='remove' className='absolute right-2 top-1'>
                <X className='h-5 w-5 fill-text-label' />
            </IconButton>
            <img src={ogp?.image} alt={ogp?.title || 'untitled'} width={100 * 1.91} height={100} />
            <div>
                <div className='flex items-center gap-1 text-text-main'>
                    <span>{ogp?.title}</span>
                    <img src={ogp?.logo} alt={ogp?.author || 'unknown'} width={16} height={16} />
                </div>
                <div className='text-sm text-text-label'>
                    {ogp?.description}
                </div>
            </div>
        </div>
    );
};

export default LinkPreview;