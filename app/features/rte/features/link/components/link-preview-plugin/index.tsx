import type { FC } from 'react'
import LinkPreviewPluginBase from './LinkPreviewPlugin'
import SimpleLinkPreviewPlugin from './simple-link-preview'
import YoutubePreviewPlugin from './youtube-preview'

const LinkPreviewPlugin: FC = () => (
    <>
        <LinkPreviewPluginBase />
        <SimpleLinkPreviewPlugin />
        <YoutubePreviewPlugin />
    </>
)

export default LinkPreviewPlugin