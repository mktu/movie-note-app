import type { FC } from 'react'
import LinkPreviewPluginBase from './LinkPreviewPlugin'
import SimpleLinkPreviewPlugin, { LinkPreviewNode, LinkPreviewPlaceholderNode } from './simple-link-preview'
import YoutubePreviewPlugin, { YoutubePreviewNode } from './youtube-preview'
import TwitterPreviewPlugin, { TwitterPreviewNode } from './twitter-preview'

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
    LinkPreviewPlaceholderNode
}
export default LinkPreviewPlugin