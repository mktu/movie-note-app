import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';

import { $createLinkPreviewNode, LinkPreviewNode } from './LinkPreviewNode';

import type {
    EmbedConfig,
    EmbedMatchResult
} from '@lexical/react/LexicalAutoEmbedPlugin';
import type { LexicalCommand, LexicalEditor } from 'lexical';

interface LinkPreveiwConfig extends EmbedConfig {
    contentName: string
}

export const INSERT_LINK_PREVIEW_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_LINK_PREVIEW_COMMAND',
);

export const SimpleLinkPreviewConfig: LinkPreveiwConfig = {
    contentName: 'Link Preview',

    insertNode: (editor: LexicalEditor, result: EmbedMatchResult) => {
        editor.dispatchCommand(INSERT_LINK_PREVIEW_COMMAND, result.url);
    },

    // Determine if a given URL is a match and return url data.
    parseUrl: async (url: string) => {
        return {
            url,
            id: ''
        };
    },

    type: 'link-preview',
};

export default function SimpleLinkPreviewPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([LinkPreviewNode])) {
            throw new Error('SimpleLinkPreviewPlugin: LinkPreviewNode not registered on editor');
        }

        return editor.registerCommand<string>(
            INSERT_LINK_PREVIEW_COMMAND,
            (payload) => {
                const node = $createLinkPreviewNode('', payload);
                $insertNodeToNearestRoot(node);

                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}