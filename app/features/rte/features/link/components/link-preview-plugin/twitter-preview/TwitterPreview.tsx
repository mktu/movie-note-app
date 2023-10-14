import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';

import { $createTwitterPreviewNode, TwitterPreviewNode } from './TwitterPreviewNode';

import type {
    EmbedConfig,
    EmbedMatchResult
} from '@lexical/react/LexicalAutoEmbedPlugin';
import type { LexicalCommand, LexicalEditor } from 'lexical';

interface TwitterPreveiwConfig extends EmbedConfig {
    contentName: string
}

type CommandType = { id: string, url: string, type: 'INSERT_TWEET_COMMAND' }

export const INSERT_TWEET_COMMAND: LexicalCommand<CommandType> = createCommand(
    'INSERT_TWEET_COMMAND',
);


export const TwitterPreviewConfig: TwitterPreveiwConfig = {
    contentName: 'Twitter Preview',

    insertNode: (editor: LexicalEditor, result: EmbedMatchResult) => {
        editor.dispatchCommand(INSERT_TWEET_COMMAND, { id: result.id, url: result.url, type: 'INSERT_TWEET_COMMAND' });
    },

    parseUrl: async (url: string) => {
        const match = /^https?:\/\/(www\.)?x\.com\/[a-zA-Z0-9_]+\/status\/([0-9]+)/.exec(url);
        if (match != null && match.length > 2) {
            return {
                id: match[2],
                url: match[0],
            };
        }
        return null
    },

    type: 'twitter-preview',
};

export default function TwitterPreviewPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([TwitterPreviewNode])) {
            throw new Error('TwitterPreviewPlugin: TwitterPreviewNode not registered on editor');
        }

        return editor.registerCommand(
            INSERT_TWEET_COMMAND,
            (payload) => {
                const node = $createTwitterPreviewNode(payload.id, payload.url);
                $insertNodeToNearestRoot(node);

                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}