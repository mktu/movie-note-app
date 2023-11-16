import type { DOMExportOutput, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import { renderToStaticMarkup } from "react-dom/server";
import Placeholder from "./Placeholder";


type SerializedYoutubePreviePlaceholderNode = Spread<{
    type: 'youtube-preview-placeholder',
    placeholderName: string,
    placeholderText: string
}, SerializedDecoratorBlockNode>

export class YoutubePreviewPlaceholderNode extends DecoratorBlockNode {
    __placeholderName: string;
    __placeholderText: string;
    static getType(): string {
        return 'youtube-preview-placeholder';
    }

    constructor(placeholderName: string, placeholderText: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__placeholderName = placeholderName
        this.__placeholderText = placeholderText
    }

    static clone(node: YoutubePreviewPlaceholderNode): YoutubePreviewPlaceholderNode {
        return new YoutubePreviewPlaceholderNode(node.__placeholderName, node.__placeholderText, node.__format, node.__key);
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const elm = (
            <div id='youtube-preview-placeholder'>
                {this.__placeholderName}
            </div>
        )
        const parent = document.createElement('div');
        parent.innerHTML = renderToStaticMarkup(elm)
        return {
            element: parent
        }
    }

    decorate(): JSX.Element {
        return <Placeholder placeholderText={this.__placeholderText} format={this.__format} nodeKey={this.__key} />
    }

    exportJSON(): SerializedYoutubePreviePlaceholderNode {
        return {
            ...super.exportJSON(),
            placeholderName: this.__placeholderName,
            placeholderText: this.__placeholderText,
            type: 'youtube-preview-placeholder',
            version: 1
        }
    }

    isInline(): false {
        return false;
    }

    static importJSON(serializedLinkPreviewNode: SerializedYoutubePreviePlaceholderNode): YoutubePreviewPlaceholderNode {
        const node = $createYoutubePreviewPlaceholderNode(serializedLinkPreviewNode.placeholderName, serializedLinkPreviewNode.placeholderText);
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }
}

export function $createYoutubePreviewPlaceholderNode(placeholderName: string, placeholderText: string): YoutubePreviewPlaceholderNode {
    return $applyNodeReplacement(new YoutubePreviewPlaceholderNode(placeholderName, placeholderText));
}

export function $isYoutubePreviewPlaceholderNode(node?: LexicalNode): node is YoutubePreviewPlaceholderNode {
    return node instanceof YoutubePreviewPlaceholderNode;
}