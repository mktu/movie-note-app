import type { DOMExportOutput, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from "lexical";
import { $applyNodeReplacement } from "lexical";
import type {
    SerializedDecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import {
    DecoratorBlockNode
} from '@lexical/react/LexicalDecoratorBlockNode';
import YoutubePreview from "./Container";
import { renderToStaticMarkup } from "react-dom/server";

type YoutubePreviewAttributes = {
    url: string,
    videoId: string
}

type SerializedYoutubePreviewNode = Spread<{
    type: 'youtube-preview',
}, Spread<YoutubePreviewAttributes, SerializedDecoratorBlockNode>>

export class YoutubePreviewNode extends DecoratorBlockNode {
    __video_id: string;
    __url: string
    static getType(): string {
        return 'youtube-preview';
    }

    constructor(videoId: string, url: string, format?: ElementFormatType, key?: NodeKey) {
        super(format, key)
        this.__video_id = videoId
        this.__url = url
    }

    static clone(node: YoutubePreviewNode): YoutubePreviewNode {
        return new YoutubePreviewNode(node.__video_id, node.__url, node.__format, node.__key);
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

    exportDOM(editor: LexicalEditor): DOMExportOutput {
        const elm = (
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${this.__video_id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
                title="YouTube video"
            />
        )
        const parent = document.createElement('div');
        parent.innerHTML = renderToStaticMarkup(elm)
        return {
            element: parent
        }
    }

    decorate(): JSX.Element {
        return <YoutubePreview videoID={this.__video_id} format={this.__format} nodeKey={this.getKey()} />
    }

    exportJSON(): SerializedYoutubePreviewNode {
        return {
            ...super.exportJSON(),
            videoId: this.__video_id,
            url: this.__url,
            type: 'youtube-preview',
            version: 1
        }
    }

    isInline(): false {
        return false;
    }

    static importJSON(serializedLinkPreviewNode: SerializedYoutubePreviewNode): YoutubePreviewNode {
        const node = $createYoutubePreviewNode(serializedLinkPreviewNode.videoId, serializedLinkPreviewNode.url);
        node.setFormat(serializedLinkPreviewNode.format);
        return node;
    }

}

export function $createYoutubePreviewNode(videoId: string, url: string): YoutubePreviewNode {
    return $applyNodeReplacement(new YoutubePreviewNode(videoId, url));
}

export function $isYoutubePreviewNode(node?: LexicalNode): node is YoutubePreviewNode {
    return node instanceof YoutubePreviewNode;
}