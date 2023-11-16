import type { FC } from 'react'
import LinkPreviewPluginBase from './LinkPreviewPlugin'
import SimpleLinkPreviewPlugin, { LinkPreviewNode, LinkPreviewPlaceholderNode } from './simple-link-preview'
import YoutubePreviewPlugin, { YoutubePreviewNode, YoutubePreviewPlaceholderNode } from './youtube-preview'
import TwitterPreviewPlugin, { TwitterPreviewNode } from './twitter-preview'
import { PlaceholderImportNode } from './PlaceholderImportNode'

const LinkPreviewPlugin: FC = () => (
    <>
        <LinkPreviewPluginBase />
        <SimpleLinkPreviewPlugin />
        <YoutubePreviewPlugin />
        <TwitterPreviewPlugin />
    </>
)
export {
    LinkPreviewNode,
    YoutubePreviewNode,
    TwitterPreviewNode,
    LinkPreviewPlaceholderNode,
    YoutubePreviewPlaceholderNode,
    PlaceholderImportNode
}
export default LinkPreviewPlugin