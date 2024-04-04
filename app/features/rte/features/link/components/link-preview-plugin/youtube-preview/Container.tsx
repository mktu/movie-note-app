import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

import type { ElementFormatType, NodeKey } from 'lexical';

type Props = {
    videoID: string,
    format: ElementFormatType | null;
    nodeKey: NodeKey;
}

const Container: FC<Props> = ({
    videoID,
    format,
    nodeKey
}) => {

    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <iframe
                className='md:h-[315px] md:w-[560px]'
                src={`https://www.youtube.com/embed/${videoID}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                title="YouTube video"
            />
        </BlockWithAlignableContents >
    );
};

export default Container;