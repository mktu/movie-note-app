import {
    $getRoot, $getSelection, $isElementNode, $isParagraphNode,
    $isRangeSelection, $isRootNode
} from 'lexical';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { useCallback, useEffect } from 'react';

import { $isAutoLinkNode, AutoLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { $createLinkPreviewNode, $isLinkPreviewNode } from '../components/LinkPreviewNode';

import type { ElementNode, LexicalNode, ParagraphNode } from 'lexical';

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

const flattenNodes: (nodes: LexicalNode[]) => LexicalNode[] = (nodes) => {
    let results: LexicalNode[] = [...nodes]
    const elements = nodes.filter(n => $isElementNode(n)).map(n => n as ElementNode)
    elements.forEach(v => {
        const children = v.getChildren()
        const elements = children.filter(c => $isElementNode(c)).map(c => c as ElementNode)
        const notElements = children.filter(c => !$isElementNode(c))
        results = [...results, ...notElements, ...flattenNodes(elements)]
    })
    return results
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
                                const url = targetLinkNode.getURL()
                                const previewNode = $createLinkPreviewNode(nodeKey, url)
                                $insertNodeToNearestRoot(previewNode);
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
    return {
        removePreview
    }
}

export default useLinkPreview