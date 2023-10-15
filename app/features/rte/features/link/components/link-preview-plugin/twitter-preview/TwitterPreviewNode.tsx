import type { DOMExportOutput, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import TwitterPreview from "./Container";

type TweetElement = {
    html: HTMLElement | null
}

type TwitterPreviewAttributes = {
    url: string,
    tweetId: string,
    tweetElement: TweetElement
}

type SerializedTwitterPreviewNode = Spread<{
    type: 'twitter-preview',
}, Spread<TwitterPreviewAttributes, SerializedDecoratorBlockNode>>

export class TwitterPreviewNode extends DecoratorBlockNode {
    __tweet_id: string;
    __url: string;
    __tweetElement: TweetElement
    static getType(): string {
        return 'twitter-preview';
    }

    constructor(tweetId: string, url: string, tweetElement?: TweetElement, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__tweet_id = tweetId
        this.__url = url
        this.__tweetElement = tweetElement || {
            html: null
        }
    }

    static clone(node: TwitterPreviewNode): TwitterPreviewNode {
        return new TwitterPreviewNode(node.__tweet_id, node.__url, node.__tweetElement, node.__format, node.__key);
    }

    getUrl(): string {
        return this.__url
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return <TwitterPreview onLoadTweet={(html) => {
            this.__tweetElement.html = html
        }} tweetId={this.__tweet_id} format={this.__format} nodeKey={this.getKey()} />
    }

    exportJSON(): SerializedTwitterPreviewNode {
        return {
            ...super.exportJSON(),
            tweetId: this.__tweet_id,
            url: this.__url,
            tweetElement: this.__tweetElement,
            type: 'twitter-preview',
            version: 1
        }
    }

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const parent = document.createElement('div');
        this.__tweetElement.html && parent.appendChild(this.__tweetElement.html)
        return {
            element: parent
        }
    }

    isInline(): false {
        return false;
    }

    static importJSON(serializedLinkPreviewNode: SerializedTwitterPreviewNode): TwitterPreviewNode {
        const node = $createTwitterPreviewNode(serializedLinkPreviewNode.tweetId, serializedLinkPreviewNode.url);
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }

}

export function $createTwitterPreviewNode(tweetId: string, url: string): TwitterPreviewNode {
    return $applyNodeReplacement(new TwitterPreviewNode(tweetId, url));
}

export function $isTwitterPreviewNode(node?: LexicalNode): node is TwitterPreviewNode {
    return node instanceof TwitterPreviewNode;
}