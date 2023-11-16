import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import type { ElementFormatType, NodeKey } from 'lexical';
import YoutubeIcon from '~/components/icons/Youtube';
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';
import { useYoutubePreview } from '../../../hooks/useYoutubePreview';

type Props = {
    format: ElementFormatType | null;
    nodeKey: NodeKey;
    placeholderText: string;
}

const Placeholder: FC<Props> = ({
    format,
    nodeKey,
    placeholderText
}) => {
    const { removePlaceholder } = useYoutubePreview()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <div className='relative flex h-[128px] w-full max-w-[95%] items-center justify-center border border-border-main text-text-label'>
                <YoutubeIcon className='mr-2 h-10 w-10' />
                <span>{placeholderText}</span>
                <IconButton name='remove' className='absolute right-2 top-1' onClick={removePlaceholder}>
                    <X className='h-5 w-5 fill-text-label' />
                </IconButton>
            </div>
        </BlockWithAlignableContents >
    );
};

export default Placeholder;