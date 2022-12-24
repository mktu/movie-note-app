import type { ElementNode, LexicalEditor, RangeSelection, TextNode } from 'lexical';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useCallback, useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type ListenerType = (editor: LexicalEditor) => void
export type RangeSelectionListenerType = (selection: RangeSelection, editor: LexicalEditor) => void
export type NodeListenerType = (node: ElementNode | TextNode, selection: RangeSelection, editor: LexicalEditor) => void

export const useUpdateListener = (listener: ListenerType) => {
    const [editor] = useLexicalComposerContext()
    useEffect(() => {
        editor.registerUpdateListener(({ editorState }) => {
            editorState.read(() => {
                listener(editor)
            });
        });
    }, [editor, listener]);
}

export const useRangeSelectionUpdateListener = (listener: RangeSelectionListenerType) => {
    const rangeListener = useCallback((editor: LexicalEditor) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        listener(selection, editor)
    }, [listener])
    useUpdateListener(rangeListener)
}

export const useNodeUpdateListener = (listener: NodeListenerType) => {
    const nodeListener: RangeSelectionListenerType = useCallback((selection, editor) => {
        const anchorNode = selection.anchor.getNode();
        const targetNode =
            anchorNode.getKey() === "root"
                ? anchorNode
                : anchorNode.getTopLevelElementOrThrow();
        listener(targetNode, selection, editor)
    }, [listener])
    useRangeSelectionUpdateListener(nodeListener)
}
