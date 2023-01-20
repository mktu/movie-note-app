import type { FC } from 'react'
import LinkPreviewPluginBase from './LinkPreviewPlugin'
import SimpleLinkPreviewPlugin from './simple-link-preview'

const LinkPreviewPlugin: FC = () => (
    <>
        <LinkPreviewPluginBase />
        <SimpleLinkPreviewPlugin />
    </>
)

export default LinkPreviewPlugin