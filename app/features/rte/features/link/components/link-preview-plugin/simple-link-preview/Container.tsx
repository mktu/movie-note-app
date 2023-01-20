import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

import { useLinkPreviewUpdater } from '../../../hooks/useLinkPreview';
import useOgp from '../../../hooks/useOgp';
import LinkPreview from './presenter';

import type { ElementFormatType, NodeKey } from 'lexical';

type Props = {
    url: string,
    format: ElementFormatType | null;
    nodeKey: NodeKey;
}

const Container: FC<Props> = ({
    url,
    format,
    nodeKey
}) => {
    const { ogp, loading, error } = useOgp(url)
    const { removePreview } = useLinkPreviewUpdater()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <LinkPreview
                url={url}
                ogp={ogp}
                loading={loading}
                error={error}
                onClickRemove={() => {
                    removePreview(url)
                }}
            />

        </BlockWithAlignableContents >
    );
};

export default Container;