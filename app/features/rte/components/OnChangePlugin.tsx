import type { EditorState, LexicalEditor } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLayoutEffect } from 'react';

// original: https://github.com/facebook/lexical/blob/main/packages/lexical-react/src/LexicalOnChangePlugin.ts
// this plugin does callback onChange if prevEditorState.isEmpty() === true
export function OnChangePlugin({
    ignoreHistoryMergeTagChange = true,
    ignoreSelectionChange = false,
    onChange,
}: {
    ignoreHistoryMergeTagChange?: boolean;
    ignoreSelectionChange?: boolean;
    onChange: (
        editorState: EditorState,
        editor: LexicalEditor,
        tags: Set<string>,
    ) => void;
}): null {
    const [editor] = useLexicalComposerContext();

    useLayoutEffect(() => {
        if (onChange) {
            return editor.registerUpdateListener(
                ({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
                    if (
                        (ignoreSelectionChange &&
                            dirtyElements.size === 0 &&
                            dirtyLeaves.size === 0) ||
                        (ignoreHistoryMergeTagChange && tags.has('history-merge'))
                    ) {
                        return;
                    }

                    onChange(editorState, editor, tags);
                },
            );
        }
    }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange]);

    return null;
}