import type { ElementFormatType, LexicalNode, NodeKey, Spread } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
  SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
  DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import LinkPreview from "./LinkPreview";

type LinkPreviewAttributes = {
  url: string,
  linkKey: string
}

type SerializedLinkPreviewNode = Spread<{
  type: 'link-preview',
}, Spread<LinkPreviewAttributes, SerializedDecoratorBlockNode>>

export class LinkPreviewNode extends DecoratorBlockNode {
  __link_key: NodeKey;
  __url: string
  static getType(): string {
    return 'link-preview';
  }

  constructor(linkKey: NodeKey, url: string, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__link_key = linkKey
    this.__url = url
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node.__key, node.__url);
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
    return <LinkPreview url={this.__url} format={this.__format} nodeKey={this.getKey()} />
  }

  exportJSON(): SerializedLinkPreviewNode {
    return {
      ...super.exportJSON(),
      url: this.__url,
      linkKey: this.__link_key,
      type: 'link-preview',
      version: 1
    }
  }

  isInline(): false {
    return false;
  }

  static importJSON(serializedLinkPreviewNode: SerializedLinkPreviewNode): LinkPreviewNode {
    const node = $createLinkPreviewNode(serializedLinkPreviewNode.linkKey, serializedLinkPreviewNode.url);
    node.setFormat(serializedLinkPreviewNode.format);
    return node;
  }

}

export function $createLinkPreviewNode(linkKey: NodeKey, url: string): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(linkKey, url));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}