import type { DOMExportOutput, DOMConversionMap, LexicalEditor, LexicalNode, Spread, DOMConversionOutput, ElementFormatType, NodeKey } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import { renderToStaticMarkup } from "react-dom/server";
import { $createLinkPreviewNode } from "./LinkPreviewNode";
import Placeholder from "./Placeholder";


type SerializedLinkPreviewNode = Spread<{
    type: 'link-preview-placeholder',
    placeholderName: string
}, SerializedDecoratorBlockNode>

export class LinkPreviewPlaceholderNode extends DecoratorBlockNode {
    __placeholderName: string;
    static getType(): string {
        return 'link-preview-placeholder';
    }

    static clone(node: LinkPreviewPlaceholderNode): LinkPreviewPlaceholderNode {
        return new LinkPreviewPlaceholderNode(node.__link_key, node.__url);
    }

    constructor(placeholderName: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__placeholderName = placeholderName
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return <Placeholder format={this.__format} nodeKey={this.__key} />
    }

    exportJSON(): SerializedLinkPreviewNode {
        return {
            ...super.exportJSON(),
            placeholderName: this.__placeholderName,
            type: 'link-preview-placeholder',
            version: 1,
        }
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const elm = this.__ogp.title !== '' ? (
            // eslint-disable-next-line tailwindcss/no-custom-classname
            <div id='link-preview-placeholder'>
                {this.__placeholderName}
            </div>
        ) : <div />
        const parent = document.createElement('div');
        parent.innerHTML = renderToStaticMarkup(elm)
        return {
            element: parent
        }
    }
    static importDOM(): DOMConversionMap | null {
        return {
            div: (node: Node) => ({
                conversion: convertPreviewElement,
                priority: 0,
            }),
        };
    }

    isInline(): false {
        return false;
    }

    static importJSON(serializedLinkPreviewNode: SerializedLinkPreviewNode): LinkPreviewPlaceholderNode {
        const node = $createLinkPreviewPlaceholderNode(serializedLinkPreviewNode.placeholderName);
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }

}

function convertPreviewElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLDivElement) {
        const { id, textContent } = domNode;
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

export function $createLinkPreviewPlaceholderNode(placeholderName: string): LinkPreviewPlaceholderNode {
    return $applyNodeReplacement(new LinkPreviewPlaceholderNode(placeholderName));
}

export function $isLinkPreviewPlaceholderNode(node?: LexicalNode): node is LinkPreviewPlaceholderNode {
    return node instanceof LinkPreviewPlaceholderNode;
}