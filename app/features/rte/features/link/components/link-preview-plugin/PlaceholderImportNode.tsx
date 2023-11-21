import { $applyNodeReplacement, type DOMConversionMap, type DOMConversionOutput, type DOMExportOutput, type LexicalEditor, type Spread } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import { $createYoutubePreviewNode } from "./youtube-preview/YoutubePreviewNode";
import { $createLinkPreviewNode } from "./simple-link-preview/LinkPreviewNode";



type SerializedPlaceholderImportNode = Spread<{
    type: 'placeholder-import'
}, SerializedDecoratorBlockNode>

export class PlaceholderImportNode extends DecoratorBlockNode {
    static getType(): string {
        return 'placeholder-import';
    }

    static clone(node: PlaceholderImportNode): PlaceholderImportNode {
        return new PlaceholderImportNode(node.__format, node.__key);
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        return {
            element: document.createElement('div')
        }
    }

    decorate(): JSX.Element {
        return <div />
    }

    exportJSON(): SerializedPlaceholderImportNode {
        return {
            ...super.exportJSON(),
            type: 'placeholder-import',
            version: 1
        }
    }

    isInline(): false {
        return false;
    }

    static importDOM(): DOMConversionMap | null {
        return {
            div: (node: Node) => ({
                conversion: convertPreviewElement,
                priority: 1,
            }),
        };

    }
    // never used
    static importJSON(serializedLinkPreviewNode: SerializedPlaceholderImportNode): PlaceholderImportNode {
        const node = $createPlaceholderImport();
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }
}

// never used
export function $createPlaceholderImport(): PlaceholderImportNode {
    return $applyNodeReplacement(new PlaceholderImportNode());
}

function convertPreviewElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLDivElement) {
        const { id, textContent } = domNode;
        if (id === 'youtube-preview-placeholder') {
            if (!textContent) {
                return null
            }
            const node = $createYoutubePreviewNode(textContent);
            return { node };
        }
        if (id === 'link-preview-placeholder') {
            if (!textContent) {
                return null
            }
            const node = $createLinkPreviewNode('', textContent);
            return { node };
        }
    }
    return null;
}