import { $getRoot } from 'lexical';
import { useCallback } from 'react';

import { $isAutoLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import {
    $isLinkPreviewNode
} from '../components/link-preview-plugin/simple-link-preview/LinkPreviewNode';

import { $isLinkPreviewPlaceholderNode } from '../components/link-preview-plugin/simple-link-preview/LinkPreviewPlaceholderNode';
import { flattenNodes } from '~/features/rte/utils/node';

export const useLinkPreviewUpdater = () => {
    const [editor] = useLexicalComposerContext()
    const removePreview = useCallback((url: string) => {
        editor.update(() => {
            const root = $getRoot();
            const preview = root.getChildren().find(v => {
                if ($isLinkPreviewNode(v)) {
                    return v.getUrl() === url
                }
                return false
            })
            if (preview) {
                preview.remove()
            }
            const link = flattenNodes(root.getChildren()).find(v => {
                if ($isAutoLinkNode(v)) {
                    return v.getURL() === url
                }
                return false
            })
            if (link) {
                link.remove()
            }
        })
    }, [editor])

    const removePlaceholder = useCallback(() => {
        editor.update(() => {
            const root = $getRoot();
            const preview = flattenNodes(root.getChildren()).find(v => {
                return $isLinkPreviewPlaceholderNode(v)
            })
            if (preview) {
                preview.remove()
            }
        })
    }, [editor])
    return {
        removePreview,
        removePlaceholder
    }
}