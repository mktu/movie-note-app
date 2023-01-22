import type { FC } from 'react'
import LinkPreviewPluginBase from './LinkPreviewPlugin'
import SimpleLinkPreviewPlugin from './simple-link-preview'
import YoutubePreviewPlugin from './youtube-preview'
import TwitterPreviewPlugin from './twitter-preview'

const LinkPreviewPlugin: FC = () => (
    <>
        <LinkPreviewPluginBase />
        <SimpleLinkPreviewPlugin />
        <YoutubePreviewPlugin />
        <TwitterPreviewPlugin />
    </>
)

export default LinkPreviewPlugin