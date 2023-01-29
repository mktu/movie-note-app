import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { DRAG_DROP_PASTE } from '@lexical/rich-text';
import { isMimeType, mediaFileReader } from '@lexical/utils';
import { COMMAND_PRIORITY_LOW } from 'lexical';
import { useEffect } from 'react';
import { INSERT_IMAGE_COMMAND } from '..';

const ACCEPTABLE_IMAGE_TYPES = [
    'image/',
    'image/heic',
    'image/heif',
    'image/gif',
    'image/webp',
];

export const useDragDropPaste = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        return editor.registerCommand(
            DRAG_DROP_PASTE,
            (files) => {
                (async () => {
                    const filesResult = await mediaFileReader(
                        files,
                        [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
                    );
                    for (const { file } of filesResult) {
                        if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
                            const formData = new FormData();
                            formData.append("image", file);

                            const param = {
                                method: "PUT",
                                body: formData,
                            }
                            const res = await fetch("/api/notes/images", param)
                            const json = await res.json<{ path: string }>()
                            editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                                altText: file.name,
                                src: json.path,
                            });
                        }
                    }
                })();
                return true;
            },
            COMMAND_PRIORITY_LOW,
        );
    }, [editor]);
}