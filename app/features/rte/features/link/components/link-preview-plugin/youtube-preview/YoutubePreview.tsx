import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $insertNodeToNearestRoot } from '@lexical/utils';

import { $createYoutubePreviewNode, YoutubePreviewNode } from './YoutubePreviewNode';

import type {
    EmbedConfig,
    EmbedMatchResult
} from '@lexical/react/LexicalAutoEmbedPlugin';
import type { LexicalCommand, LexicalEditor } from 'lexical';

interface YoutubePreveiwConfig extends EmbedConfig {
    contentName: string
}

type CommandType = { id: string, url: string, type: 'INSERT_YOUTUBE_COMMAND' }

export const INSERT_YOUTUBE_COMMAND: LexicalCommand<CommandType> = createCommand(
    'INSERT_YOUTUBE_COMMAND',
);


export const YoutubePreviewConfig: YoutubePreveiwConfig = {
    contentName: 'Youtube Preview',

    insertNode: (editor: LexicalEditor, result: EmbedMatchResult) => {
        editor.dispatchCommand(INSERT_YOUTUBE_COMMAND, { id: result.id, url: result.url, type: 'INSERT_YOUTUBE_COMMAND' });
    },

    parseUrl: async (url: string) => {
        const match =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/.exec(url);

        const id = match ? (match?.[2].length === 11 ? match[2] : null) : null;

        if (id != null) {
            return {
                id,
                url,
            };
        }
        return null
    },

    type: 'youtube-preview',
};

export default function YoutubePreviewPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([YoutubePreviewNode])) {
            throw new Error('YouTubePlugin: YouTubeNode not registered on editor');
        }

        return editor.registerCommand(
            INSERT_YOUTUBE_COMMAND,
            (payload) => {
                const node = $createYoutubePreviewNode(payload.id, payload.url);
                $insertNodeToNearestRoot(node);

                return true;
            },
            COMMAND_PRIORITY_EDITOR,
        );
    }, [editor]);

    return null;
}