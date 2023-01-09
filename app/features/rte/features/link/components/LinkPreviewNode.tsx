import type { LexicalNode, NodeKey } from "lexical";
import { $applyNodeReplacement } from "lexical";
import { DecoratorNode } from "lexical";
import type { ReactNode } from "react";

export class LinkPreviewNode extends DecoratorNode<ReactNode> {
  __link_key: NodeKey;
  static getType(): string {
    return 'link-preview';
  }

  constructor(linkKey: NodeKey, key?: NodeKey) {
    super(key)
    this.__link_key = linkKey
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node.__key);
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
    return <span>hello</span>
  }

}

export function $createLinkPreviewNode(linkKey: NodeKey): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(linkKey));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}