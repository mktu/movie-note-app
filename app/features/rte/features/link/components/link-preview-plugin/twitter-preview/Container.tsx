import type { FC } from 'react'

import { TwitterTweetEmbed } from 'react-twitter-embed';

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

import type { ElementFormatType, NodeKey } from 'lexical';

type Props = {
    tweetId: string,
    format: ElementFormatType | null;
    nodeKey: NodeKey;
    onLoadTweet: (node: HTMLElement) => void
}

const Container: FC<Props> = ({
    tweetId,
    format,
    nodeKey,
    onLoadTweet
}) => {
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <div className='max-w-[550px]'>
                <TwitterTweetEmbed
                    onLoad={onLoadTweet}
                    tweetId={tweetId}
                />
            </div>
        </BlockWithAlignableContents >
    );
};

export default Container;