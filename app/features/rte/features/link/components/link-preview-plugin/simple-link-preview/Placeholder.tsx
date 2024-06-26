import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';
import type { ElementFormatType, NodeKey } from 'lexical';
import { ImdbIcon } from '~/features/imdb';
import { useLinkPreviewUpdater } from '../../../hooks/useLinkPreview';
import { IconButton } from '~/components/buttons';
import X from '~/components/icons/X';

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
    const { removePlaceholder } = useLinkPreviewUpdater()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <div className='relative flex h-[128px] w-[95%] max-w-[95%] items-center justify-center border border-border-main text-text-label'>
                <ImdbIcon className='mr-2 size-10' />
                <span>{placeholderText}</span>
                <IconButton name='remove' className='absolute right-2 top-1' onClick={removePlaceholder}>
                    <X className='size-5 fill-text-label' />
                </IconButton>
            </div>
        </BlockWithAlignableContents >
    );
};

export default Placeholder;