import type { DOMExportOutput, DOMConversionMap, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread, DOMConversionOutput } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
  SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
  DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import LinkPreview from "./Container";
import { renderToStaticMarkup } from "react-dom/server";
import type { OgpType } from "functions/api/ogp";
import PreviewCard from "./presenter/PreviewCard";

type LinkPreviewAttributes = {
  url: string,
  linkKey: string,
  ogp?: OgpType;
}

type SerializedLinkPreviewNode = Spread<{
  type: 'link-preview',
}, Spread<LinkPreviewAttributes, SerializedDecoratorBlockNode>>

export class LinkPreviewNode extends DecoratorBlockNode {
  __link_key: NodeKey;
  __url: string;
  __ogp: OgpType;
  static getType(): string {
    return 'link-preview';
  }

  constructor(linkKey: NodeKey, url: string, ogp?: OgpType, format?: ElementFormatType, key?: NodeKey) {
    super(format, key)
    this.__link_key = linkKey
    this.__url = url
    this.__ogp = ogp || {
      title: '',
      url: '',
      description: '',
      image: '',
      author: '',
      date: '',
      logo: ''
    }
  }

  static clone(node: LinkPreviewNode): LinkPreviewNode {
    return new LinkPreviewNode(node.__link_key, node.__url, node.__ogp, node.__format, node.__key);
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
    return <LinkPreview onFetchOgp={(ogp) => {
      this.__ogp.url = ogp.url
      this.__ogp.author = ogp.author
      this.__ogp.description = ogp.description
      this.__ogp.image = ogp.image
      this.__ogp.title = ogp.title
      this.__ogp.logo = ogp.logo
    }} url={this.__url} format={this.__format} nodeKey={this.getKey()} />
  }

  exportJSON(): SerializedLinkPreviewNode {
    return {
      ...super.exportJSON(),
      url: this.__url,
      linkKey: this.__link_key,
      type: 'link-preview',
      version: 1,
      ogp: this.__ogp.title === '' ? undefined : this.__ogp
    }
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const elm = this.__ogp.title !== '' ? (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div id='link-preview-node'>
        <PreviewCard ogp={this.__ogp} />
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

  static importJSON(serializedLinkPreviewNode: SerializedLinkPreviewNode): LinkPreviewNode {
    const node = $createLinkPreviewNode(serializedLinkPreviewNode.linkKey, serializedLinkPreviewNode.url, serializedLinkPreviewNode.ogp);
    node.setFormat(serializedLinkPreviewNode.format);
    return node;
  }

}

function convertPreviewElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLDivElement) {
    const { id } = domNode;
    if (id === 'link-preview-node') {
      const aNode = domNode.querySelector('a')
      const imgNode = domNode.querySelector("img[id='img']") as HTMLImageElement
      const logoNode = domNode.querySelector("img[id='logo']") as HTMLImageElement
      const descriptionNode = domNode.querySelector('#description')
      if (!aNode) {
        return null
      }
      console.log(aNode, imgNode)

      const node = $createLinkPreviewNode('', aNode.href, {
        "title": aNode.textContent,
        "author": null,
        "description": descriptionNode?.textContent || '',
        "image": imgNode?.src || '',
        "date": "2022-11-29T01:08:17.000Z",
        "logo": logoNode?.src || '',
        "url": aNode.href
      });
      return { node };
    }
  }
  return null;
}

export function $createLinkPreviewNode(linkKey: NodeKey, url: string, ogp?: OgpType): LinkPreviewNode {
  return $applyNodeReplacement(new LinkPreviewNode(linkKey, url, ogp));
}

export function $isLinkPreviewNode(node?: LexicalNode): node is LinkPreviewNode {
  return node instanceof LinkPreviewNode;
}