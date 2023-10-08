import type { FC } from 'react'

import { BlockWithAlignableContents } from '@lexical/react/LexicalBlockWithAlignableContents';

import { useLinkPreviewUpdater } from '../../../hooks/useLinkPreview';
import useOgp from '../../../hooks/useOgp';
import LinkPreview from './presenter';

import type { ElementFormatType, NodeKey } from 'lexical';
import type { OgpType } from 'functions/api/ogp';

type Props = {
    url: string,
    format: ElementFormatType | null;
    nodeKey: NodeKey;
    onFetchOgp: (ogp: OgpType) => void
}

const Container: FC<Props> = ({
    url,
    format,
    nodeKey,
    onFetchOgp
}) => {
    const { ogp, loading, error } = useOgp(url, onFetchOgp)
    const { removePreview } = useLinkPreviewUpdater()
    return (
        <BlockWithAlignableContents
            format={format}
            nodeKey={nodeKey}
            className={{
                base: 'relative',
                focus: 'relative outline outline-indigo-300'
            }}>
            <div className='max-w-[95%]'>
                <LinkPreview
                    url={url}
                    ogp={ogp}
                    loading={loading}
                    error={error}
                    onClickRemove={() => {
                        removePreview(url)
                    }}
                />
            </div>

        </BlockWithAlignableContents >
    );
};

export default Container;