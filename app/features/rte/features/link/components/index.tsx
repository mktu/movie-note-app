import type { FC } from 'react'
import AutoLinkPlugin from './AutoLinkPlugin'

import FloatingLinkMenu from './FloatingLinkMenu'
import LinkPreviewPlugin from './link-preview-plugin'

const LinkPlugins: FC = () => {
    return (
        <>
            <AutoLinkPlugin />
            <FloatingLinkMenu />
            <LinkPreviewPlugin />
        </>
    );
};

export {
    LinkPreviewNode,
    TwitterPreviewNode,
    YoutubePreviewNode,
    LinkPreviewPlaceholderNode,
    YoutubePreviewPlaceholderNode,
    PlaceholderImportNode
} from './link-preview-plugin'
export { default as LinkInserter } from './LinkInserter'
export default LinkPlugins;