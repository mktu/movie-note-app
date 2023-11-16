import type { DOMExportOutput, LexicalEditor, LexicalNode, Spread, ElementFormatType, NodeKey } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import { renderToStaticMarkup } from "react-dom/server";
import Placeholder from "./Placeholder";


type SerializedLinkPreviewNode = Spread<{
    type: 'link-preview-placeholder',
    placeholderName: string,
    placeholderText: string
}, SerializedDecoratorBlockNode>

export class LinkPreviewPlaceholderNode extends DecoratorBlockNode {
    __placeholderName: string;
    __placeholderText: string;
    static getType(): string {
        return 'link-preview-placeholder';
    }

    static clone(node: LinkPreviewPlaceholderNode): LinkPreviewPlaceholderNode {
        return new LinkPreviewPlaceholderNode(node.__placeholderName, node.__placeholderText, node.__format, node.__key);
    }

    constructor(placeholderName: string, placeholderText: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__placeholderName = placeholderName
        this.__placeholderText = placeholderText
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return <Placeholder placeholderText={this.__placeholderText} format={this.__format} nodeKey={this.__key} />
    }

    exportJSON(): SerializedLinkPreviewNode {
        return {
            ...super.exportJSON(),
            placeholderName: this.__placeholderName,
            placeholderText: this.__placeholderText,
            type: 'link-preview-placeholder',
            version: 1,
        }
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const elm = (
            <div id='link-preview-placeholder'>
                {this.__placeholderName}
            </div>
        )
        const parent = document.createElement('div');
        parent.innerHTML = renderToStaticMarkup(elm)
        return {
            element: parent
        }
    }

    isInline(): false {
        return false;
    }

    static importJSON(serializedLinkPreviewNode: SerializedLinkPreviewNode): LinkPreviewPlaceholderNode {
        const node = $createLinkPreviewPlaceholderNode(serializedLinkPreviewNode.placeholderName, serializedLinkPreviewNode.placeholderText);
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }

}

export function $createLinkPreviewPlaceholderNode(placeholderName: string, placeholderText: string): LinkPreviewPlaceholderNode {
    return $applyNodeReplacement(new LinkPreviewPlaceholderNode(placeholderName, placeholderText));
}

export function $isLinkPreviewPlaceholderNode(node?: LexicalNode): node is LinkPreviewPlaceholderNode {
    return node instanceof LinkPreviewPlaceholderNode;
}