import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react"
import type { LexicalEditor, RangeSelection } from 'lexical';
import { $getSelection, $isRangeSelection } from 'lexical';

export type RangeUpdater = (selection: RangeSelection, editor: LexicalEditor) => void

export const useRangeUpdater = () => {
    const [editor] = useLexicalComposerContext()
    const updateRange = useCallback((rangeUpdater: RangeUpdater) => {
        editor.update(() => {
            const selection = $getSelection();
            if (!$isRangeSelection(selection)) return;
            rangeUpdater(selection, editor)
        });
    }, [editor])
    return {
        updateRange
    }
}