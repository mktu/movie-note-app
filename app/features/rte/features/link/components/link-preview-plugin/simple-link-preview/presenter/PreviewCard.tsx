import type { FC } from 'react'

import type useOgp from '../../../../hooks/useOgp';

type Props = Pick<ReturnType<typeof useOgp>, 'ogp'>

const PreviewCard: FC<Props> = ({
    ogp
}) => {
    return (
        <div className='flex gap-2'>
            <img src={ogp?.image} alt={ogp?.title || 'untitled'} width={100 * 1.91} height={100} />
            <div>
                <div className='flex items-center gap-1 text-text-main'>
                    <a href={ogp?.url} className='underline'>{ogp?.title}</a>
                </div>
                <div className='text-sm text-text-label'>
                    {ogp?.description}
                </div>
                <div className='mt-2 flex items-center gap-1 text-sm text-text-label'>
                    <img src={ogp?.logo} alt={ogp?.author || 'unknown'} width={16} height={16} style={{ width: 16, height: 16 }} />
                    <span>{ogp?.url}</span>
                </div>
            </div>
        </div>
    );
};

export default PreviewCard;