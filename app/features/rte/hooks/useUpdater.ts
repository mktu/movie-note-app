import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react"
import type { LexicalEditor, RangeSelection } from 'lexical';
import { $getRoot, $getSelection, $isRangeSelection } from 'lexical';

export type RangeUpdater = (selection: RangeSelection, editor: LexicalEditor) => void

export const useRangeUpdater = () => {
    const [editor] = useLexicalComposerContext()
    const updateRange = useCallback((rangeUpdater: RangeUpdater) => {
        editor.update(() => {
            let selection = $getSelection();
            if (selection === null) {
                selection = $getRoot().select();
            }
            if (!$isRangeSelection(selection)) return;
            rangeUpdater(selection, editor)
        });
    }, [editor])
    return {
        updateRange
    }
}