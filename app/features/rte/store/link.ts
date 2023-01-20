import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { $isLinkNode } from '@lexical/link';
import { $isParagraphNode } from 'lexical';
import type { NodeListenerType } from "../hooks/useUpdateListener";
import { getSelectedNode } from "../utils/linkInserter";

type LinkElementType = {
    url: string,
    valid: boolean
}

export const linkType = atom<LinkElementType>({
    key: 'movie-note-editor-link',
    default: { url: '', valid: true }
});

export const useLinkListener = () => {
    const setUrl = useSetRecoilState(linkType)
    const { url, valid } = useRecoilValue(linkType)

    const listener: NodeListenerType = useCallback((_, selection) => {
        const node = getSelectedNode(selection);
        const parent = node.getParent();
        const valid = selection.getNodes().filter(v => $isParagraphNode(v)).length <= 1
        if ($isLinkNode(parent)) {
            setUrl({ url: parent.getURL(), valid });
        } else if ($isLinkNode(node)) {
            setUrl({ url: node.getURL(), valid });
        } else {
            setUrl({ url: '', valid });
        }
    }, [setUrl])
    return {
        listener,
        url,
        valid
    }
}