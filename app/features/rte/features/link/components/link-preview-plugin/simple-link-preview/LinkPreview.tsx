import type { FC } from 'react'
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

import { useLinkPreviewUpdater } from '../../../hooks/useLinkPreview';
import useOgp from '../../../hooks/useOgp';

import type { ElementFormatType, NodeKey } from 'lexical';

type Props = {
    url: string,
    format: ElementFormatType | null;
    nodeKey: NodeKey;
}

const LinkPreview: FC<Props> = ({
    url,
    format,
    nodeKey
}) => {
    const { ogp } = useOgp(url)
    const { removePreview } = useLinkPreviewUpdater()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative flex items-center gap-1',
                focus: 'relative flex items-center gap-1 outline outline-indigo-300'
            }}>
            <IconButton name='remove' className='absolute right-2 top-1' onClick={() => {
                removePreview(url)
            }}>
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
        </BlockWithAlignableContents>
    );
};

export default LinkPreview;