import { useEffect } from 'react';
import { AutoLinkNode, $isAutoLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { LexicalNode, ParagraphNode } from 'lexical';
import { $createParagraphNode, $getRoot, $getSelection, $isParagraphNode, $isRangeSelection, $isRootNode } from 'lexical';
import { $createLinkPreviewNode, $isLinkPreviewNode } from '../components/LinkPreviewNode';

const getParagraph: (node: LexicalNode) => ParagraphNode | null = (node) => {
    const parent = node.getParent()
    if ($isParagraphNode(parent)) {
        return parent
    }
    if (!parent || $isRootNode(parent)) {
        return null
    }
    return getParagraph(parent)
}

const getLink: (node: LexicalNode) => AutoLinkNode | null = (node) => {
    const parent = node.getParent()
    if ($isAutoLinkNode(parent)) {
        return parent
    }
    if (!parent || $isRootNode(parent)) {
        return null
    }
    return getLink(parent)
}

const useLinkPreview = () => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        return editor.registerMutationListener(
            AutoLinkNode,
            (mutatedNodes) => {
                for (let [nodeKey, mutation] of mutatedNodes) {
                    if (mutation === 'created') {
                        editor.update(() => {
                            const selection = $getSelection();
                            if (!$isRangeSelection(selection)) {
                                return false
                            }
                            const nodes = selection.getNodes()
                            const targetLinkNode = nodes.map(v => getLink(v)).filter(Boolean).find(v => v?.getKey() === nodeKey)
                            if (!targetLinkNode) {
                                return false
                            }
                            const paragraps = nodes.map(v => getParagraph(v)).filter(Boolean)
                            if (paragraps.length > 0 && paragraps[0]) {
                                const previewNode = $createLinkPreviewNode(nodeKey)
                                const paragraph = $createParagraphNode()
                                paragraps[0].insertAfter(paragraph)
                                paragraps[0].insertAfter(previewNode)
                            }
                        });
                    } else if (mutation === 'destroyed') {
                        editor.update(() => {
                            const root = $getRoot();
                            const preview = root.getChildren().find(v => {
                                if ($isLinkPreviewNode(v)) {
                                    return v.getLinkKey() === nodeKey
                                }
                                return false
                            })
                            if (preview) {
                                preview.remove()
                            }
                        })
                    }
                }

            },
        )
    }, [editor])
}

export default useLinkPreview