import type { ElementFormatType, LexicalNode, NodeKey, Spread } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import TwitterPreview from "./Container";

type TwitterPreviewAttributes = {
    url: string,
    tweetId: string
}

type SerializedTwitterPreviewNode = Spread<{
    type: 'youtube-preview',
}, Spread<TwitterPreviewAttributes, SerializedDecoratorBlockNode>>

export class TwitterPreviewNode extends DecoratorBlockNode {
    __tweet_id: string;
    __url: string
    static getType(): string {
        return 'youtube-preview';
    }

    constructor(tweetId: string, url: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__tweet_id = tweetId
        this.__url = url
    }

    static clone(node: TwitterPreviewNode): TwitterPreviewNode {
        return new TwitterPreviewNode(node.__key, node.__url);
    }

    getUrl(): string {
        return this.__url
    }

    getLinkKey(): NodeKey {
        return this.__link_key
    }

    createDOM(): HTMLElement {
        return document.createElement('div');
    }

    updateDOM(): false {
        return false;
    }

    decorate(): JSX.Element {
        return <TwitterPreview tweetId={this.__tweet_id} format={this.__format} nodeKey={this.getKey()} />
    }

    exportJSON(): SerializedTwitterPreviewNode {
        return {
            ...super.exportJSON(),
            tweetId: this.__tweet_id,
            url: this.__url,
            type: 'youtube-preview',
            version: 1
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