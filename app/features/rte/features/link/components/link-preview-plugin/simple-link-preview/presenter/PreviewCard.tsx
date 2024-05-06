import type { FC } from 'react'

import type useOgp from '../../../../hooks/useOgp';

type Props = Pick<ReturnType<typeof useOgp>, 'ogp'>

const imgW = 100 * 1.91
const imgH = 100

const PreviewCard: FC<Props> = ({
    ogp
}) => {
    return (
        <div className='flex gap-2'>
            <img id='img' src={ogp?.image} alt={ogp?.title || 'untitled'} width={imgW} height={imgH} style={{
                width: imgW,
                height: imgH,
                objectFit: 'cover'
            }} />
            <div className='overflow-hidden'>
                <div className='flex items-center gap-1 text-text-main'>
                    <a href={ogp?.url} className='truncate underline'>{ogp?.title}</a>
                </div>
                <div id='description' className='line-clamp-2 text-sm text-text-label'>
                    {ogp?.description}
                </div>
                <div className='mt-2 flex items-center gap-1 text-sm text-text-label'>
                    <img id='logo' src={ogp?.logo} alt={ogp?.author || 'unknown'} width={16} height={16} style={{ width: 16, height: 16 }} />
                    <span className='truncate'>{ogp?.url}</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewCard;