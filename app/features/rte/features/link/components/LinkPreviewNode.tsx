import type { LexicalNode, NodeKey } from "lexical";
import { $applyNodeReplacement } from "lexical";
import { DecoratorNode } from "lexical";
import type { ReactNode } from "react";
import LinkPreview from "./LinkPreview";

export class LinkPreviewNode extends DecoratorNode<ReactNode> {
  __link_key: NodeKey;
  __url: string
  static getType(): string {
    return 'link-preview';
  }

  constructor(linkKey: NodeKey, url: string, key?: NodeKey) {
    super(key)
    this.__link_key = linkKey
    this.__url = url
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node.__key, node.__url);
  }

  getLinkKey(): NodeKey {
    return this.__link_key
  }

  createDOM(): HTMLElement {
    return document.createElement('p');
  }

  updateDOM(): false {
    return false;
  }

  decorate(): ReactNode {
    return <LinkPreview url={this.__url} />
  }

}

export function $createLinkPreviewNode(linkKey: NodeKey, url: string): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(linkKey, url));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}